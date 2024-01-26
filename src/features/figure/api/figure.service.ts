import { api } from '@/services/api';
import { Figure } from '../types';
import { GetFigureListResponse } from '../types/get-figure-list-response.type';
import { PostFigureBody } from '../types/post-figure-body';

enum Tags {
  FigureList = 'FigureList',
}

const figureApi = api.enhanceEndpoints({ addTagTypes: [Tags.FigureList] }).injectEndpoints({
  endpoints: (build) => ({
    getFigures: build.query<GetFigureListResponse, void>({
      query: () => '/figure',
      providesTags: [Tags.FigureList],
    }),

    createFigure: build.mutation<Figure, PostFigureBody>({
      query: (body) => ({
        url: '/figure',
        body,
        method: 'POST',
        formData: true,
      }),
      invalidatesTags: [Tags.FigureList],
    }),
  }),
});

export const { useGetFiguresQuery, useCreateFigureMutation } = figureApi;
export { figureApi };
