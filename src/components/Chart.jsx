import React from 'react'
import { Line, Pie } from '@ant-design/charts';
import moment from 'moment';

function Chart({ sortedTransactions }) {
    // For the Line chart data
    const data = sortedTransactions.map((item) => {
        return { date: moment(item.date).format("YYYY-MM-DD"), amount: item.amount };
    });

    // For the Pie chart data (spending/expenses only)
    const spendingData = sortedTransactions
        .filter(transaction => transaction.type === "expense")  // Filter out only expense transactions
        .map(transaction => {
            return { tag: transaction.tag, amount: transaction.amount };  // Return relevant fields for Pie chart
        });

    // Line chart configuration
    const lineConfig = {
        data,
        width: 800,
        height: 400,
        xField: 'date',
        yField: 'amount',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
        xAxis: {
            type: 'timeCat',  // Recognizes the xField as time-based data
            label: {
                formatter: (val) => moment(val).format('YYYY-MM-DD'),  // Formats the date on the axis
            },
        },
    };

// Pie chart configuration
const pieConfig = {
    data: spendingData,
    angleField: 'amount',
    colorField: 'tag',
    radius: 0.8, // Adjusting this value may help
    label: {
        type: 'outer',
        content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
    width: 400,  // Specify width
    height: 400, // Specify height
};


    return (
        <div className='flex justify-between'>
            <div>
                <h2 className='flex justify-center items-center'>Your Analytics</h2>
                <Line {...lineConfig} />
            </div>
            <div>
                <h2 className='flex justify-center items-center'>Your Spending</h2>
                <Pie {...pieConfig} />
            </div>
        </div>
    );
}

export default Chart;
