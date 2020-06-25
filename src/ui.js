import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

  
  const UI = (props) => {
    const {
      buttonLabel,
      className,
      sel,
      deSel
    } = props;
  
    const [modal, setModal] = useState(true);
    const toggle = () => {  
                            deSel();
                          };

    const airpod_pdf = 'https://manuals.coolblue.nl/ae/apple-airpods.pdf';

    return (
      <div>
        {sel === true ? (
          <div>
            
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Airpod - Unveil</ModalHeader>
              <ModalBody>
                <iframe style={{marginLeft:20}} width="420" height="345" src="https://www.youtube.com/embed/IC9urbiVp4M"></iframe>
              </ModalBody>
              <ModalFooter>
                {/*<Button color="primary" onClick={{}}>Do Something</Button>{' '}
                <Button color="secondary" onClick={{}}>Cancel</Button>
              */}
              </ModalFooter>
            </Modal>
          </div>
        ) : (
          null
        )}
      </div>
    );
  }

export default UI;
