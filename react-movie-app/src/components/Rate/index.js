import React, { useState } from 'react';

//when we vote, will invoke a callback, that will send a request to the api
//the rating will be 1-10, will start initially with 5
const Rate = ({ callback }) => {
    const [value, setValue] = useState(5);

    return (
        <div>

            <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            />

            {value}
            <p>
                <button onClick={() => callback(value)}>
                    Rate
                </button>
            </p>

        </div>
    )


}

export default Rate;
