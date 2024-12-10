import Carousel from 'react-bootstrap/Carousel';

function CarouselsImages({imagesUrl}) {
  return (
    <Carousel data-bs-theme="dark">
      {imagesUrl.map((image, index) => (
        <>
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={image}
            alt=""
          />
          </Carousel.Item>
        </>
      ))}
    
    </Carousel>
  );
}

export default CarouselsImages;