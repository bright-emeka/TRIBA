from app.core.exceptions import TRIBAException


class ProfilesException(TRIBAException):
    pass


class ProfileNotFoundError(ProfilesException):
    def __init__(self):
        super().__init__("PROFILE_NOT_FOUND", "Profile not found", 404)


class ProfileUpdateError(ProfilesException):
    def __init__(self, detail: str):
        super().__init__("PROFILE_UPDATE_ERROR", detail, 400)
