import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { MotionVideo } from './motion.jsx';
import { GitVsGithubVideo } from './git-vs-github.jsx';
import { CrossAppTrackingVideo } from './cross-app-tracking.jsx';
import { CookieStoryVideo } from './cookie-story.jsx';
import { UrlStoryVideo } from './url-story.jsx';
import { CookieLocalStoryVideo } from './cookie-local-story.jsx';
import { ConcurrencyStoryVideo } from './concurrency-story.jsx';
import { SqlNosqlStoryVideo } from './sql-nosql-story.jsx';
import { IdStoryVideo } from './id-story.jsx';
import { NormalizationStoryVideo } from './normalization-story.jsx';
import example from '../contents/example.json';
import gitVsGithub from '../contents/git-vs-github.json';
import gitVsGithubLegacy from '../archive/git-vs-github-legacy.json';
import crossAppTracking from '../contents/cross-app-tracking.json';
import cookieStory from '../contents/bahas-tuntas-cookie.json';
import urlStory from '../contents/struktur-url.json';
import cookieLocalStory from '../contents/cookie-vs-localstorage.json';
import concurrency from '../contents/concurrency.json';
import sqlNosql from '../contents/sql-vs-nosql.json';
import idStory from '../contents/auto-increment-vs-uuid.json';
import normalizationStory from '../contents/normalization-vs-denormalization.json';
import { getVideoConfig } from './project.js';

const Root = () => (<>
  <Composition
    id="NormalizationVsDenormalization"
    component={NormalizationStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(normalizationStory).durationInFrames}
    defaultProps={{ project: normalizationStory }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="AutoIncrementVsUuid"
    component={IdStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(idStory).durationInFrames}
    defaultProps={{ project: idStory }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="SqlVsNosql"
    component={SqlNosqlStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(sqlNosql).durationInFrames}
    defaultProps={{ project: sqlNosql }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="Concurrency"
    component={ConcurrencyStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(concurrency).durationInFrames}
    defaultProps={{ project: concurrency }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="CookieVsLocalStorage"
    component={CookieLocalStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(cookieLocalStory).durationInFrames}
    defaultProps={{ project: cookieLocalStory }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="StrukturUrl"
    component={UrlStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(urlStory).durationInFrames}
    defaultProps={{ project: urlStory }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="BahasTuntasCookie"
    component={CookieStoryVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(cookieStory).durationInFrames}
    defaultProps={{ project: cookieStory }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="CrossAppTracking"
    component={CrossAppTrackingVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(crossAppTracking).durationInFrames}
    defaultProps={{ project: crossAppTracking }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="Motion"
    component={MotionVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(example).durationInFrames}
    defaultProps={{ project: example }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="GitVsGithub"
    component={MotionVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(gitVsGithub).durationInFrames}
    defaultProps={{ project: gitVsGithub }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
  <Composition
    id="GitVsGithubLegacy"
    component={GitVsGithubVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={getVideoConfig(gitVsGithubLegacy).durationInFrames}
    defaultProps={{ project: gitVsGithubLegacy }}
    calculateMetadata={({ props }) => getVideoConfig(props.project)}
  />
</>);

registerRoot(Root);
