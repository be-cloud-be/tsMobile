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
        '/sites'
    ], type='http', auth="public", methods=['POST'], csrf=False)
    def sites(self, userCode=False, debug=False, **k):
        return json.dumps({ 'sites' : request.env['project.project'].sudo().search_read([],['name','code'])})
