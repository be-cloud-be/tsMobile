import json
import werkzeug
import itertools
import pytz
import babel.dates
from collections import OrderedDict

from odoo import http, fields, _
from odoo.addons.http_routing.models.ir_http import slug, unslug
from odoo.addons.website.controllers.main import QueryURL
from odoo.exceptions import UserError
from odoo.http import request
from odoo.tools import html2plaintext

class TsMobile(http.Controller):

    @http.route([
        '/check_code'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def check_code(self, userCode, debug=False, **k):
        user_ids = request.env['hr.employee'].sudo().search_read([['mobile_code','=',userCode]],['name'])
        if user_ids:
            return { "name" : user_ids[0].name}
        else:
            return UserError("Invalid Code")

    @http.route([
        '/sites'
    ], type='json', auth='public', website=True, csrf=False, cors="*")
    def sites(self, userCode=False, debug=False, **k):
        return { 'sites' : request.env['project.project'].sudo().search_read([],['name','code'])}
