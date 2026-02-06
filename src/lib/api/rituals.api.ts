import apiClient from "../http/apiClient";

export interface RitualMedia {
  id: string;
  url: string;
  type: string;
}

export interface RitualTag {
  id: string;
  name: string;
}

export interface Ritual {
  id: string;
  name: string;
  description: string;
  content: string;
  difficultyLevel: string;
  timeOfExecution: number;
  ritualCategoryId: string;
  ritualMedias: RitualMedia[];
  ritualTags: RitualTag[];
  reference?: string;
  isHot: boolean;
  dateLunar?: string;
  dateSolar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RitualResponse {
  statusCode: number;
  message: string;
  data: {
    data: Ritual[];
    meta: {
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
  timestamp: string;
}

export const ritualsApi = {
  async getRituals(): Promise<RitualResponse> {
    const response = await apiClient.get("/ritual");
    console.log(response.data);
    return response.data.data;
  },

  // async getRitualBySlug(slug: string): Promise<Ritual> {
  //   const response = await apiClient.get(`/rituals/${slug}`);
  //   return response.data;
  // },
};

export default ritualsApi;
