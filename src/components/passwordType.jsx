import React from 'react';

const PasswordType = ({changeIncludes, type, msg, includes}) => {
    return (
        <div className={'flex gap-4'}>
            <input type="checkbox"
                   onChange={() => changeIncludes(type)}
                   checked={includes.includes(type)}
            />
            {msg}
        </div>
    );
};

export default PasswordType;