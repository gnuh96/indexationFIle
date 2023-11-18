import './styles.css'
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid'

import {styled} from '@mui/material/styles'

interface DataGridComponentProps {
  rows: GridRowsProp
  cols: GridColDef[]
  maxHeight: string
  rowHeight: number
  noRowText?: string
  onRowClick?: (row: any) => void
}

const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: '1px solid #7A8295',
    width: '100%',
  },

  '& .MuiDataGrid-columnHeader': {
    paddingRight: '0px',
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center',
  },

  '& .MuiDataGrid-columnHeaderTitleContainerContent': {
    width: '100%',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },

  '& .MuiDataGrid-iconButtonContainer button': {
    padding: '4px',
  },
  '& .MuiDataGrid-cell': {
    justifyContent: 'center',
  },
}))

export default function DataGridComponent({
  rows,
  cols,
  maxHeight,
  rowHeight,
  noRowText = 'No rows',
  onRowClick,
}: DataGridComponentProps) {
  const customLocaleText = {
    noRowsLabel: noRowText,
  }

  return (
    <div
      className='dataGridContainer'
      style={{maxHeight: maxHeight, width: '80%'}}>
      <StyledDataGrid
        disableColumnFilter
        rows={rows}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        disableRowSelectionOnClick
        disableColumnMenu
        rowHeight={rowHeight}
        localeText={customLocaleText}
        onRowClick={onRowClick}
      />
    </div>
  )
}
