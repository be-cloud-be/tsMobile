import json
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
        return { 'sites' : request.env['project.project'].sudo().search_read([],['name','code'])}

    @http.route([
        '/ts_mobile/tasks'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def tasks(self, userCode=False, site=False, debug=False, **k):
        _logger.info("Tasks for site %s" % site)
        if site :
            return { 'tasks' : request.env['project.task'].sudo().search_read([['stage_id','=','456'],['project_id.id','=',site]],['name'])} #ie "En cours"
        else :
            raise UserError("Site requiered")

    @http.route([
        '/ts_mobile/submit'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def submit(self, userCode=False, item=False, debug=False, **k):
        employee_ids = request.env['hr.employee'].sudo().search([['mobile_code','=',userCode]],['name'])
        if employee_ids:
            employee_id = employee_ids[0]
