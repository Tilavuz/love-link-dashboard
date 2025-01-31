class UserSearchQueryStorage {
  getQuery() {
    const query = localStorage.getItem("searchQuery");
    if (query) {
      return JSON.parse(query);
    }
    return null;
  }
  setQuery({
    query,
  }: {
    query: {
      page: number;
      ages?: string;
      gender?: number;
      location?: string;
      goal?: string;
    };
  }) {
    const searchQuery = JSON.stringify(query);
    localStorage.setItem("searchQuery", searchQuery);
    return localStorage.getItem("searchQuery");
  }
  stringQuery({
    page,
    ages,
    gender,
    location,
    goal,
  }: {
    page: number;
    ages?: string;
    gender?: number;
    location?: string;
    goal?: string;
  }) {
    return `${page}${ages}${gender}${location}${goal}`;
  }
}

export const userSearchQueryStorage = new UserSearchQueryStorage();
