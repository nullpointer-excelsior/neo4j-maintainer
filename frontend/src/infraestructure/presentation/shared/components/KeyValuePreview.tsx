import React from 'react';
import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { KeyValueData } from '../../pages/neo4j-maintainer/dto/key-value-data.dto';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface Props {
    keyValueData: KeyValueData[];
    onRemove: (key: string) => void;
}

function EmptyRows() {
    return (
        <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <StyledTableCell component="th" scope="row" colSpan={3} align="center">No hay propiedades definidas</StyledTableCell>
        </StyledTableRow>
    )
}

export default function KeyValuePreview({ keyValueData, onRemove }: Props) {
    const isEmpty = keyValueData?.length === 0
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Clave</StyledTableCell>
                        <StyledTableCell >Valor</StyledTableCell>
                        <StyledTableCell align="center">Eliminar</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { isEmpty ? <EmptyRows /> :
                        keyValueData.map((d) => (
                            <StyledTableRow key={d.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="th" scope="row">{d.key}</StyledTableCell>
                                <StyledTableCell>{d.value}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={e => onRemove(d.key)}>ELIMINAR</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}