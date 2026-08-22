from app.core.exceptions import TRIBAException


class AdminException(TRIBAException):
    pass


class ReportNotFoundError(AdminException):
    def __init__(self):
        super().__init__("REPORT_NOT_FOUND", "Report not found", 404)


class AdminPermissionError(AdminException):
    def __init__(self):
        super().__init__("ADMIN_PERMISSION_ERROR", "Admin access required", 403)
