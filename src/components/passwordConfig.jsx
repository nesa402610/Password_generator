import React from 'react';
import PasswordType from "./passwordType";

const PasswordConfig = ({changeIncludes, inc}) => {
    return (
        <div className={'flex flex-col'}>
            <PasswordType changeIncludes={changeIncludes}
                          type={'U'}
                          msg={'Includes Uppercase Letters'}
                          includes={inc}
            />
            <PasswordType changeIncludes={changeIncludes}
                          type={'L'}
                          msg={'Includes Lowercase Letters'}
                          includes={inc}
            />
            <PasswordType changeIncludes={changeIncludes}
                          type={'N'}
                          msg={'Includes numbers'}
                          includes={inc}
            />
            <PasswordType changeIncludes={changeIncludes}
                          type={'S'}
                          msg={'Includes Symbols'}
                          includes={inc}
            />
        </div>
    );
};

export default PasswordConfig;