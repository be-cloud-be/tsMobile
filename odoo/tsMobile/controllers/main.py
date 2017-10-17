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

class TsMobile(http.Controller):

    @http.route([
        '/ts_mobile/check_code'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def check_code(self, userCode=False, debug=False, **k):
        user_ids = request.env['hr.employee'].sudo().search_read([['mobile_code','=',userCode]],['name'])
        if user_ids:
            return { "name" : user_ids[0]['name']}
        else:
            raise AccessError("Invalid Code")

    @http.route([
        '/ts_mobile/sites'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def sites(self, userCode=False, debug=False, **k):
        return { 'sites' : request.env['project.project'].sudo().search_read([],['name','code'])}
