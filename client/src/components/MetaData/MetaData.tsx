import { Helmet } from "react-helmet";

interface MetaDataProps {
  title: string;
}

const MetaData: React.FC<MetaDataProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Amazon Clone 2`}</title>
    </Helmet>
  );
};

export default MetaData;
