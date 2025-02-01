import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://facebook.com/ees.iiests' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://twitter.com/ees_iiests' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://www.instagram.com/ees.iiests/' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://linkedin.com/company/ees-iiests' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://github.com/ees-iiests' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="bolt" className="me-3" />
                Electrical Engineers' Society
              </h6>
              <p>
                The Electrical Engineers' Society (EES) of IIEST Shibpur is a student-run organization that promotes
                technical excellence, research, and innovation in the field of Electrical Engineering.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Our Initiatives</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Sphuran - Tech Fest
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  AptiCrack - Weekly Test
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Workshops & Seminars
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Research & Projects
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful Links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Events
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Contact
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Get Involved
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Electrical Engineering Department, IIEST Shibpur, Howrah - 711103, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                ees@iiests.ac.in
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91 98765 43210
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +91 98765 43211
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className='text-reset fw-bold' href='https://ees.iiests.in/' target='_blank' rel='noopener noreferrer'>
          EESIIESTS.IN
        </a>
      </div>
    </MDBFooter>
  );
}