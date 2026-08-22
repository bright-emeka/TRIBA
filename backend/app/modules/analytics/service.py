from app.modules.analytics.repository import AnalyticsRepository


class AnalyticsService:
    @staticmethod
    def get_user_stats(user_id: str) -> dict:
        return AnalyticsRepository.get_user_stats(user_id)

    @staticmethod
    def get_platform_stats() -> dict:
        return AnalyticsRepository.get_platform_stats()
