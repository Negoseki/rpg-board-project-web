import { AppThunkAction } from '..'
import apiService from '../../../services/api'
import socket from '../../../services/socket'
import { FigureState } from '../../../models/types/store/figure-state.type'
import { boardActions } from './board.slice'
import { dragDropActions } from '../drag-drop'

const TEMP_ID = 'figure-temp-id'

export const fetchBoardData = (): AppThunkAction => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const data = await apiService.get<{ figures: FigureState[] }>(`/board/${state.board.id}`)
      dispatch(boardActions.loadBoard(data))
    } catch (err) {
      console.log('Fetch board data => ', err)
    }
  }
}

export const addTempFigure = (
  figure: Pick<FigureState, 'name' | 'imageUrl' | 'size'>,
): AppThunkAction => {
  return async (dispatch) => {
    const newFigure: FigureState = {
      ...figure,
      id: TEMP_ID,
      position: {
        x: -1,
        y: -1,
      },
    }
    dispatch(boardActions.updateFigure(newFigure))
    dispatch(dragDropActions.onDragStart(newFigure))
  }
}

export const placeFigure = (figure: FigureState): AppThunkAction => {
  return async (dispatch, getState) => {
    const state = getState()
    let { x, y } = state.dragDrop.currentPosition
    const figureSize = state.board.tileSize * state.board.figures[figure.id].size

    x = Math.round((x - figureSize / 2) / state.board.tileSize)
    y = Math.round((y - figureSize / 2) / state.board.tileSize)
    const position = { x, y }

    dispatch(dragDropActions.onDragEnd())

    if (figure.id !== TEMP_ID) {
      socket.emitEvent<{ id: string; figure: FigureState }>('board:updateFigure', {
        id: figure.id,
        figure: {
          ...figure,
          position,
        },
      })
      dispatch(boardActions.figureNewPosition({ figure, position }))
    } else {
      const { id, ...newFigure } = {
        ...figure,
        position,
      }
      socket.emitEvent<{ figure: Omit<FigureState, 'id'> }>('board:createFigure', {
        figure: newFigure,
      })
    }
  }
}
