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

_logger = logging.getLogger(__name__)

class TsMobile(http.Controller):

    @http.route([
        '/sites',
        '/sites/<int:userCode>',
    ], type='json', auth="public", website=True)
    def sites(self, userCode=False, debug=False, **k):
        _logger.info('Get Sites')
        return request.env['project.project'].sudo().search_read([],['name','code'])
