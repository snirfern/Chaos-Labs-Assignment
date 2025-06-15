import React from 'react';
import {CSVLink} from 'react-csv';

interface CsvWidgetProps<T extends { [key: string]: any }> {
    data: T[];
    filename?: string;
}

function CsvWidget<T extends { [key: string]: any }>({data, filename = 'chart_data',}: CsvWidgetProps<T>) {
    if (!data || data.length === 0) {
        return null;
    }

    const headers = Object.keys(data[0]).map((key) => ({
        label: key,
        key: key,
    }));

    return (
        <CSVLink
            data={data}
            headers={headers}
            filename={`${filename}.csv`}
            title="Download CSV"
            style={{textDecoration: 'none'}}
        >
      <span
          className="csv-icon"
          style={{color: 'white', cursor: 'pointer', fontSize: '1.5rem'}}
      >
        csv
      </span>

        </CSVLink>
    );
}

export default CsvWidget;
