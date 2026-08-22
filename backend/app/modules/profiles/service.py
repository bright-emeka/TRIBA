from app.modules.profiles.repository import ProfileRepository


class ProfileService:
    @staticmethod
    def get_profile(username: str) -> dict | None:
        return ProfileRepository.get_by_username(username)

    @staticmethod
    def update_profile(uid: str, updates: dict) -> dict:
        return ProfileRepository.update(uid, updates)

    @staticmethod
    def upload_avatar(uid: str, file) -> str:
        return ProfileRepository.upload_avatar(uid, file)
