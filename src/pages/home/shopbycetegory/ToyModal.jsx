import React from 'react';
import { Modal } from 'react-bootstrap';

const ToyModal = ({ toy, handleClose }) => {
  return (
    <Modal show={!!toy} onHide={handleClose}>
      <Modal.Header className='border-0' closeButton></Modal.Header>
      <Modal.Body>
        {toy && (
          <div className="card p-2 border-0">
            <div className="text-center">
              <h3 className="my-3 fw-bold">{toy.name}</h3>
              <img className="w-50 h-100" src={toy.image} alt="" />
            </div>
            <div>
              <p>
                <strong>Seller Name:</strong> {toy.sellerName}
              </p>
              <p>
                <strong>Seller Email:</strong> {toy.sellerEmail}
              </p>
              <p>
                <strong>Price: $</strong> {toy.price}
              </p>
              <p>
                <strong>Rating:</strong> {toy.rating}
              </p>
              <p>
                <strong>Quantity:</strong> {toy.quantity}
              </p>
              <p>
                <strong>Description:</strong> {toy.description}
              </p>
              
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ToyModal;
