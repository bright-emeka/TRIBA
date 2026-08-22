from app.modules.search.repository import SearchRepository


class SearchService:
    @staticmethod
    def search_users(query: str) -> list[dict]:
        return SearchRepository.search_users(query)
