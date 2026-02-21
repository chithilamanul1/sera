import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Seranex | Web Development Company & Custom Software Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '80px',
                    background: 'linear-gradient(135deg, #0a1628 0%, #0d2847 30%, #0c3d5e 60%, #071a2e 100%)',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Grid overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                {/* Blue glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 500,
                        height: 500,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '40px',
                    }}
                >
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 800,
                        }}
                    >
                        S
                    </div>
                    <span
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.7)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        seranex.org
                    </span>
                </div>

                {/* Main heading */}
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 800,
                        color: 'white',
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        marginBottom: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <span>Web Development</span>
                    <span>
                        & <span style={{ color: '#60a5fa' }}>Custom Software</span>
                    </span>
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 22,
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                    }}
                >
                    <span>Web Apps</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>Mobile</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>AI Solutions</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>Ecommerce</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
