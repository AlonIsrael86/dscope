// Lazy-loaded component wrappers, extracted from App.tsx (Etap 2 — split monolith).
// Each pairs React.lazy() with a Suspense boundary so call sites stay simple.
import { lazy, Suspense } from 'react';

const LazySpaceObjectRenderer = lazy(() => import('./components/BrandSpaceObjects').then(m => ({ default: m.SpaceObjectRenderer })));
export const SpaceObjectRenderer = (props: any) => <Suspense fallback={null}><LazySpaceObjectRenderer {...props} /></Suspense>;

const LazyRealisticPlanet = lazy(() => import('./components/Planets').then(m => ({ default: m.RealisticPlanet })));
export const RealisticPlanet = (props: any) => <Suspense fallback={null}><LazyRealisticPlanet {...props} /></Suspense>;

const LazyRealisticAnimals3D = lazy(() => import('./components/RealisticAnimals3D').then(m => ({ default: m.RealisticAnimals3D })));
export const RealisticAnimals3D = (props: any) => <Suspense fallback={null}><LazyRealisticAnimals3D {...props} /></Suspense>;

const LazySpaceTech2D = lazy(() => import('./components/SpaceTech2D').then(m => ({ default: m.SpaceTech2D })));
export const SpaceTech2D = (props: any) => <Suspense fallback={null}><LazySpaceTech2D {...props} /></Suspense>;

const LazyIndustryTech2D = lazy(() => import('./components/IndustryTech2D').then(m => ({ default: m.IndustryTech2D })));
export const IndustryTech2D = (props: any) => <Suspense fallback={null}><LazyIndustryTech2D {...props} /></Suspense>;

const LazyLionSculpture = lazy(() => import('./components/LionSculpture').then(m => ({ default: m.LionSculpture })));
export const LionSculpture = (props: any) => <Suspense fallback={null}><LazyLionSculpture {...props} /></Suspense>;

const LazyModelViewer = lazy(() => import('./components/ModelViewer').then(m => ({ default: m.ModelViewer })));
export const ModelViewer = (props: any) => <Suspense fallback={null}><LazyModelViewer {...props} /></Suspense>;

const LazyFlybyObject = lazy(() => import('./components/FlybyObject').then(m => ({ default: m.FlybyObject })));
export const FlybyObject = (props: any) => <Suspense fallback={null}><LazyFlybyObject {...props} /></Suspense>;

const LazyOceanBackground = lazy(() => import('./components/OceanBackground').then(m => ({ default: m.OceanBackground })));
export const OceanBackground = (props: any) => <Suspense fallback={null}><LazyOceanBackground {...props} /></Suspense>;

const LazyOceanHorizonBackground = lazy(() => import('./components/Backgrounds').then(m => ({ default: m.OceanHorizonBackground })));
export const OceanHorizonBackground = (props: any) => <Suspense fallback={null}><LazyOceanHorizonBackground {...props} /></Suspense>;

const LazyMarsBackground = lazy(() => import('./components/Backgrounds').then(m => ({ default: m.MarsBackground })));
export const MarsBackground = (props: any) => <Suspense fallback={null}><LazyMarsBackground {...props} /></Suspense>;

const LazyDeepOceanBackground = lazy(() => import('./components/Backgrounds').then(m => ({ default: m.DeepOceanBackground })));
export const DeepOceanBackground = (props: any) => <Suspense fallback={null}><LazyDeepOceanBackground {...props} /></Suspense>;

const LazyScrollParticles = lazy(() => import('./components/ScrollParticles').then(m => ({ default: m.ScrollParticles })));
export const ScrollParticles = (props: any) => <Suspense fallback={null}><LazyScrollParticles {...props} /></Suspense>;

const LazyMoleculesBackground = lazy(() => import('./components/Backgrounds').then(m => ({ default: m.MoleculesBackground })));
export const MoleculesBackground = (props: any) => <Suspense fallback={null}><LazyMoleculesBackground {...props} /></Suspense>;

const LazyMicrochipsBackground = lazy(() => import('./components/Backgrounds').then(m => ({ default: m.MicrochipsBackground })));
export const MicrochipsBackground = (props: any) => <Suspense fallback={null}><LazyMicrochipsBackground {...props} /></Suspense>;

const LazyBoomableSpaceObject = lazy(() => import('./components/BrandSpaceObjects').then(m => ({ default: m.BoomableSpaceObject })));
export const BoomableSpaceObject = (props: any) => <Suspense fallback={null}><LazyBoomableSpaceObject {...props} /></Suspense>;

const LazySectorDashboardModal = lazy(() => import('./components/SectorDashboardModal').then(m => ({ default: m.SectorDashboardModal })));
export const SectorDashboardModal = (props: any) => <Suspense fallback={null}><LazySectorDashboardModal {...props} /></Suspense>;
