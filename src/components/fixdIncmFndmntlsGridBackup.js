import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { IntlProvider, load, LocalizationProvider, loadMessages, IntlService } from '@progress/kendo-react-intl';

import { process } from '@progress/kendo-data-query';
const DATE_FORMAT = 'yyyy-mm-dd hh:mm:ss.SSS';
const intl = new IntlService('en');


const FixedIncmFundmntlsGrid = ({data}) => {

  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    sort: [{
      field: 'mtrtyYr',
      dir: 'desc'
    }],
    group: [{
      field: 'mtrtyYr'
    }]
  });
  const [dataResult, setDataResult] = React.useState(process(data, dataState));
  data.forEach(o => {
    o.maturityDt = intl.parseDate(o.maturityDt ? o.maturityDt : '10/20/2020', DATE_FORMAT);
  });

  const dataStateChange = event => {
    setDataResult(process(data, event.dataState));
    setDataState(event.dataState);
  };


  let _pdfExport;

  const exportExcel = () => {
    _export.save();
  };

  let _export;

  const exportPDF = () => {
    _pdfExport.save();
  };

  return (
            
              <div>
                <ExcelExport data={dataResult} ref={exporter => {
          _export = exporter;
        }}>
                  <Grid style={{
            height: '700px'
          }} sortable={true} filterable={true} groupable={true} reorderable={true} pageable={{
            buttonCount: 4,
            pageSizes: true
          }} data={dataResult} {...dataState} onDataStateChange={dataStateChange}>
                    <GridToolbar>
                      <button title="Export to Excel" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={exportExcel}>
                        Export to Excel
                      </button>&nbsp;
                      <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={exportPDF}>Export to PDF</button>
                    </GridToolbar>
                    <GridColumn field="mtrtyYr" width="200px" />
                    <GridColumn field="astShrtNm" width="280px" />
                    <GridColumn field="couponRate" filter="numeric" width="200px" />
                    <GridColumn field="maturityDt" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="employeeID" filter="numeric" width="200px" />
                    <GridColumn field="shares" title="Shares" width="150px" filter="numeric" format="{0:n2}"/>
                    <GridColumn field="market" title="Market($)" width="150px" format="{0:n2}" filter="numeric" />
                    <GridColumn field="yield" title="Yield%" width="150px" filter="numeric" format="{0:n2}"  />

                    <GridColumn field="moodyRating" menu={true} title="Moody Rating" width="150px" />
                    <GridColumn field="sPRating" menu={true} title="SP Rating" width="150px" />
                  </Grid>
                </ExcelExport>
                <GridPDFExport ref={element => {
          _pdfExport = element;
        }} margin="1cm">
                  {<Grid data={process(dataResult, {
            skip: dataState.skip,
            take: dataState.take
          })}>
                    <GridColumn field="mtrtyYr" width="200px" />
                    <GridColumn field="astShrtNm" width="280px" />
                    <GridColumn field="couponRate" filter="numeric" width="200px" />
                    <GridColumn field="maturityDt" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="employeeID" filter="numeric" width="200px" />
                    <GridColumn field="shares" title="Shares" width="150px" filter="numeric" format="{0:n2}"  filterable={false}/>
                    <GridColumn field="market" title="Market($)" width="150px" format="{0:n2}" filter="numeric"  filterable={false}/>
                    <GridColumn field="yield" title="Yield%" width="150px" filter="numeric" format="{0:n2}"  filterable={false} />

                    <GridColumn field="moodyRating" menu={true} title="Moody Rating" width="150px" />
                    <GridColumn field="sPRating" menu={true} title="SP Rating" width="150px" />
                  </Grid>}
                </GridPDFExport>
              </div>
)};

export default FixedIncmFundmntlsGrid