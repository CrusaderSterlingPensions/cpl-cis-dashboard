import { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import AccountOpeningForm from './AccountOpeningForm';
import JSZip from 'jszip';
import DownloadPDF from './DownloadPDF';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { mandateSelector } from '../../../redux/mandateSlice';

const PinComponent = () => {
  const [pdfs, setPdfs] = useState<any>([]);
  const { mandatePins } = useSelector(mandateSelector);
  const [pins, setPins] = useState(mandatePins);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfs = async () => {
      const pdfPromises = pins.map(async (pin: any) => {
        const response = await fetch(
          `http://132.10.100.221:9912/crusader/webservices/api/mandate/${pin}`,
        );
        const imageResponse = await fetch(
          `http://132.10.100.221:9912/crusader/webservices/api/getMandatePic/${pin}`,
        );
        const signatureResponse = await fetch(
          `http://132.10.100.221:9912/crusader/webservices/api/getMandateSig/${pin}`,
        );
        const data = await response.json();
        const imageData = await imageResponse.json();
        const signatureData = await signatureResponse.json();
        const userData = data.data[0][0];
        console.log(userData);
        const component = (
          <AccountOpeningForm
            data={data?.data[0][0]}
            images={imageData.image}
            signature={signatureData.image}
          />
        );
        const blob = await pdf(component).toBlob();
        return { pin, blob, userData };
      });
      const pdfResults = await Promise.all(pdfPromises);
      setPdfs(pdfResults);
    };
    fetchPdfs();
  }, [pins]);

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    pdfs.forEach((pdf: any) => {
      zip.file(
        `${pdf?.userData?.SURNAME} ${pdf?.userData?.FIRSTNAME} ${pdf?.pin}.pdf`,
        pdf.blob,
      );
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const downloadLink = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = `CPL_Mandate_${moment().format('LLL')}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      navigate(`/`, { replace: true });
    }, 4000);
  };

  return (
    <div>{pdfs.length > 0 && <DownloadPDF onClick={handleDownloadAll} />}</div>
  );
};

export default PinComponent;
