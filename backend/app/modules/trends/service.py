from app.modules.trends.repository import TrendsRepository


class TrendsService:
    @staticmethod
    def get_trending_topics() -> list[dict]:
        return TrendsRepository.get_trending_topics()

    @staticmethod
    def get_trending_posts() -> list[dict]:
        return TrendsRepository.get_trending_posts()
