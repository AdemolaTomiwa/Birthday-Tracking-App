import React from 'react';

const AlertModal = ({ open, body, close, accept }) => {
   return (
      <>
         {open ? (
            <div className="alert-modal">
               <div className="content">
                  <div className="head">
                     <h4>D-Day</h4>
                     <div onClick={close} className="icon">
                        <i className="fas fa-times"></i>
                     </div>
                  </div>
                  <div className="body">
                     <h4>{body}</h4>
                  </div>
                  <div className="button">
                     <button onClick={accept} className="btn btn-primary">
                        Delete
                     </button>
                  </div>
               </div>
            </div>
         ) : null}
      </>
   );
};

export default AlertModal;
