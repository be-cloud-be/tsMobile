import json
import logging
import werkzeug
import itertools
import pytz
import babel.dates
from collections import OrderedDict

from odoo import http, fields, _
from odoo.addons.http_routing.models.ir_http import slug, unslug
from odoo.addons.website.controllers.main import QueryURL
from odoo.exceptions import UserError, AccessError
from odoo.http import request
from odoo.tools import html2plaintext

_logger = logging.getLogger(__name__)

class TsMobile(http.Controller):

    @http.route([
        '/ts_mobile/check_code'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def check_code(self, userCode=False, debug=False, **k):
        employee_ids = request.env['hr.employee'].sudo().search_read([['mobile_code','=',userCode]],['name'])
        if employee_ids:
            return { "name" : employee_ids[0]['name']}
        else:
            raise AccessError("Invalid Code")

    @http.route([
        '/ts_mobile/sites'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def sites(self, userCode=False, debug=False, **k):
        return { 'sites' : request.env['project.project'].sudo().search_read([['task_ids.stage_id.id','=','456']],['name','code'])}

    @http.route([
        '/ts_mobile/tasks'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def tasks(self, userCode=False, site=False, debug=False, **k):
        if site :
            return { 'tasks' : request.env['project.task'].sudo().search_read([['stage_id.id','=','456'],['project_id.id','=',site]],['name'])} #ie "En cours"
        else :
            raise UserError("Site requiered")

    @http.route([
        '/ts_mobile/submit'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def submit(self, userCode=False, item=False, debug=False, **k):
        employee_ids = request.env['hr.employee'].sudo().search([['mobile_code','=',userCode]])
        if employee_ids:
            employee_id = employee_ids[0]
            _logger.info(item)
            start_float = int(item['start'][:2])+int(item['start'][-2:])/60
            end_float = int(item['end'][:2])+int(item['end'][-2:])/60
            pause_float = int(item['pause'][:2])+int(item['pause'][-2:])/60

            request.env['account.analytic.line'].sudo().create({
                'name': 'tsMobile Line',
                'date': item['date'],
                'project_id': int(item['site']),
                'task_id': int(item['task']),
                'unit_amount': end_float-start_float-pause_float,
                'employee_id': employee_id.id,
            })

    @http.route([
        '/ts_mobile/list'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def list(self, userCode=False, debug=False, **k):
        line_ids = request.env['account.analytic.line'].sudo().search_read(
            [['employee_id.mobile_code','=',userCode],['date','>',fields.Date.today() + relativedelta(days=-10)]],
            ['name','date','project_id','task_id','unit_amount','employee_id']
        )
        return line_ids
