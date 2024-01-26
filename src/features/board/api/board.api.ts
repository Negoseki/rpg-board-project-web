import api from '@/services/api/base.api';
import { socket } from '@/services/socket';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { Board, GetBoardResponse } from '../types';
import { BoardFigure } from '../types/board-figure.type';
import { GetBoardListResponse } from '../types/get-board-list-response.type';

const boardFigureAdapter = createEntityAdapter<BoardFigure>();

const boardApi = api.enhanceEndpoints({ addTagTypes: ['BoardList'] }).injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<GetBoardListResponse, void>({
      query: () => '/board',
      providesTags: ['BoardList'],
    }),
    createBoard: build.mutation<Board, { name: string }>({
      query: (body) => ({
        url: '/board',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['BoardList'],
    }),
    updateBoardFigure: build.mutation<
      void,
      { id: string; figure: BoardFigure | Omit<BoardFigure, 'id'> }
    >({
      queryFn: async ({ id, figure }) => {
        const conn = await socket.getConnection('/board', { id });

        if ((figure as BoardFigure).id) {
          return { data: conn.emitEvent<BoardFigure>('board:updateFigure', figure as BoardFigure) };
        }

        return { data: conn.emitEvent<Omit<BoardFigure, 'id'>>('board:createFigure', figure) };
      },
    }),
    getBoard: build.query<Board, { id: string }>({
      query: ({ id }) => `/board/${id}`,
      transformResponse(response: GetBoardResponse) {
        const board = {
          ...response,
          figures: boardFigureAdapter.addMany(
            boardFigureAdapter.getInitialState(),
            response.figures,
          ),
        };
        return board;
      },
      onCacheEntryAdded: async (
        { id },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) => {
        await cacheDataLoaded;

        const conn = await socket.getConnection('/board', { id });
        conn.attachListeners<BoardFigure>('board:updateFigure', (data) => {
          updateCachedData((state) => {
            boardFigureAdapter.upsertOne(state.figures, data);
          });
        });

        await cacheEntryRemoved;
        conn.disconnect();
      },
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useUpdateBoardFigureMutation,
} = boardApi;
export { boardApi };
