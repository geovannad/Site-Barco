import Carousel from 'react-bootstrap/Carousel';

function CarouselsImages({imagesUrl}) {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=f5f5f5"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselsImages;