import React from 'react'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import './FilterBar.css'

function FilterBar({ startDate, endDate, setStartDate, setEndDate }) {
    // const [startDate, setStartDate] = React.useState()
    // const [endDate, setEndDate] = React.useState()

    return (
        <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minimumLength={1}
            format='dd MMM yyyy'
            locale={enGB}
        >
            {({ startDateInputProps, endDateInputProps, focus }) => (
                <div className='date-range'>
                    <span className="range-title" >Range:</span>
                    <input
                        className={'input-dates' + (focus === START_DATE ? ' -focused' : '')}
                        {...startDateInputProps}
                        placeholder='Start date'
                    />
                    <span className='date-range_arrow' />
                    <input
                        className={'input-dates' + (focus === END_DATE ? ' -focused' : '')}
                        {...endDateInputProps}
                        placeholder='End date' 
                    />
                </div>
            )}
        </DateRangePicker>
    )
}

export default FilterBar
