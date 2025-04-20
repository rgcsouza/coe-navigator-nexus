
import { getStatusBadge, getStatusIcon } from "@/utils/statusHelpers";

interface OperationStatusBannerProps {
  status: string;
}

const OperationStatusBanner = ({ status }: OperationStatusBannerProps) => {
  return (
    <div className={`w-full p-4 rounded-lg flex items-center gap-3 ${getStatusBadge(status)}`}>
      {getStatusIcon(status)}
      <div>
        <h2 className="font-semibold">Status: {status}</h2>
        <p className="text-sm opacity-90">Última atualização: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default OperationStatusBanner;
