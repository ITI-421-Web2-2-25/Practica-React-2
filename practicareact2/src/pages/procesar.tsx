import { useLocation } from 'react-router-dom';
import DataTable from "react-data-table-component";

const Procesar = () => {
    const location = useLocation();
    const contenido = location.state ? location.state.contenido : null;

    const columns = contenido[0].map((item: any) => {
        return {
            name: item,
            selector: (row: any) => row[item],
            sortable: true,
        }
    });

    const data = [contenido.slice(1, 100).map((row: any) => {
        const obj: any = {};
        for (let i = 0; i < row.length; i++) {
            obj[columns[i].name] = row[i];
        }
        return obj;
    })];

    const customStyle = {
        rows: {
            style: {
                minHeight: '50px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '14px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '14px',
            },
        },
    };

    return (
        <div>
            <h4>Contenido del archivo</h4>
            <br />
            <h5>Estrucutra de datos</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {contenido[0].map((item: any, index: number) => <th key={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {contenido[1].map((item: any, index: number) => <td key={index}>{typeof item}</td>)}
                    </tr>
                </tbody>
            </table>

            <br />
            <h5>Conjunto de datos con DataTable</h5>
            <DataTable
                columns={columns}
                data={data[0]}
                pagination
                selectableRows
                customStyles={customStyle}
            />
        </div>
    )
}

export default Procesar;