from app.core.exceptions import TRIBAException


class ProfilesException(TRIBAException):
    pass


class ProfileNotFoundError(ProfilesException):
    def __init__(self):
        super().__init__("PROFILE_NOT_FOUND", "Profile not found", 404)


class ProfilePermissionError(ProfilesException):
    def __init__(self):
        super().__init__("PROFILE_PERMISSION_ERROR", "Cannot update another user's profile", 403)
