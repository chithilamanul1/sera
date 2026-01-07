import { ShieldCheck, Lock, Globe } from 'lucide-react';

export default function TrustSignals() {
    return (
        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-xs font-mono mb-6 md:mb-0">
            <div className="flex items-center gap-1.5" title="Site is secured with SSL encryption">
                <Lock className="w-3.5 h-3.5 text-green-500" />
                <span>SSL SECURED</span>
            </div>
            <div className="flex items-center gap-1.5" title="We comply with GDPR data protection rules">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>GDPR COMPLIANT</span>
            </div>
            <div className="flex items-center gap-1.5" title="Operating globally">
                <Globe className="w-3.5 h-3.5 text-silver" />
                <span>GLOBAL SERVERS</span>
            </div>
        </div>
    );
}
