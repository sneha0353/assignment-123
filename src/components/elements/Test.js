import React, { useContext,useState } from 'react';
import PropTypes from 'prop-types';
import { alpha,makeStyles,useTheme,withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import axios from '../../axios';
import FilterListIcon from '@material-ui/icons/FilterList';
import ConfirmationDialog from './Dialog';
import ClearIcon from '@material-ui/icons/Clear';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import {Context} from "../../context/context"
import { Link } from 'react-router-dom';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: 0,
    },
  }));

function createData(name, calories, fat, carbs, protein, price) {
    if(fat.length>0)
    {
        var arr = []
        fat.map((item,index)=>(
            arr.push({date:index+1,amount:item})
        ))
    }
  return {
    name,
    calories,
    fat:fat[0],
    carbs,
    protein,
    price,
    history: arr.length > 0 ? arr : "",
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const setLocal = (obj) => {
    console.log(obj)
    localStorage.setItem('name',obj.name);
    localStorage.setItem('id',obj.id);
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
           {row.name} 
        </TableCell>
        <TableCell align="right"><Link to='/character' onClick={()=>setLocal({id:row.name,name:row.calories})}>{row.calories}</Link></TableCell>
        <TableCell align="right">{row.fat}
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                All Occupations
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No.</TableCell>
                    <TableCell align="right">Occupation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const useStyles2 = makeStyles((theme) => ({
    paper: {
      backgroundColor: alpha(theme.palette.common.white, 0.80)
    },
    search: {
      position: 'relative',
      marginBottom:'20px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.65),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width:'240px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      color:'white',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    table: {
      minWidth: 500,
    },
  }));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: alpha(theme.palette.common.black, 0.45),
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: alpha(theme.palette.common.white, 0.7)
  },
  title: {
    flex: '1 1 100%',
  },
  search: {
    padding:'5px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
  },
}));

const EnhancedTableToolbar = ({data,Clear,handleSearch,toggleDialog}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: false,
      })}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Breaking Bad Characters
      </Typography>
      <Tooltip title="">
        {data ? 
            <IconButton className={classes.searchIcon} onClick={() => Clear()}>
              <ClearIcon />
            </IconButton>
            : 
            <IconButton className={classes.searchIcon}>
              <SearchIcon />
            </IconButton>
          }
        </Tooltip>
        <Tooltip title="Search">
        <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              onChange={(e)=> handleSearch(e.target.value)}
              value={data}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Tooltip>
        <Tooltip title="Filter list">
            <IconButton aria-label="expand row" onClick={() => toggleDialog()}>
              <FilterListIcon /> 
            </IconButton>
        </Tooltip>
    </Toolbar>
  );
};

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const classes = useStyles2();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows,setRows]=React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [data,setData]=useState();
  const {state}=useContext(Context);
  const [open, setOpen] = React.useState(false);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(()=>{
    if(state) {
      setLoading(true)
      if(state === "None")
      {
        axios.get('/characters').then(characters => {
          if(characters.data)
          {
              var arr = []
              characters.data.map(item=>(
                  arr.push(createData(item.char_id,item.name,item.occupation,item.birthday,item.status))
              ))
              setRows(arr)
              setLoading(false)
          }
      })
      }
      else{
        axios.get(`/characters?category=${state}`).then(characters => {
          console.log(characters.data)
          if(characters.data)
            {
                var arr = []
                characters.data.map(item=>(
                    arr.push(createData(item.char_id,item.name,item.occupation,item.birthday,item.status))
                ))
                setRows(arr)
                setLoading(false)
            }
        })
      }
    }
  },[state])

  React.useEffect(()=>{
      setLoading(true);
      axios.get('/characters').then(characters => {
          console.log(characters.data)
          setLoading(false)
          if(characters.data)
          
          {
              var arr = []
              characters.data.map(item=>(
                  arr.push(createData(item.char_id,item.name,item.occupation,item.birthday,item.status))
              ))
              setRows(arr)
              setLoading(false)
          }
      })
    },[]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch=(data)=>{
    setData(data)
    if(data)
    {
      setLoading(true)
      axios.get(`/characters?name=${data}`).then(characters => {
        if(characters.data)
          {
              var arr = []
              characters.data.map(item=>(
                  arr.push(createData(item.char_id,item.name,item.occupation,item.birthday,item.status))
              ))
              setRows(arr)
              setLoading(false)
          }
      })
    } else {
      setLoading(true)
      axios.get(`/characters`).then(characters => {
        if(characters.data)
          {
              var arr = []
              characters.data.map(item=>(
                  arr.push(createData(item.char_id,item.name,item.occupation,item.birthday,item.status))
              ))
              setRows(arr)
              setLoading(false)
          }
      })
    }
  }

  const Clear = () => {
    setData("")
    handleSearch("")
  }

  const toggleDialog = () => {
    setOpen(!open)
  }

  return (
      <div style={{padding:'20px',marginTop:'10px'}} id='test'>
      <ConfirmationDialog open={open} handleClose={handleClose} />

      <Paper className={classes.paper} >
      <EnhancedTableToolbar data={data} Clear={Clear} handleSearch={handleSearch} toggleDialog={toggleDialog} />
      <TableContainer>
        {loading ? <LinearProgress /> : <LinearProgress variant='determinate' color='secondary' value={100} />}
        <Table 
        className={classes.table}
        aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Id</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Occupation</StyledTableCell>
              <StyledTableCell align="right">Date-Of-Birth</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows).map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow hover={true} style={{ height: 50 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </Paper>
    </div>
    );
}
