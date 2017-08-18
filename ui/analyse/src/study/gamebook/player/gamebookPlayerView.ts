import { h } from 'snabbdom'
import { VNode } from 'snabbdom/vnode'
import GamebookPlayerCtrl from './gamebookPlayerCtrl';
// import AnalyseCtrl from '../../../ctrl';
import { innerHTML } from '../../../util';
import { enrichText } from '../../studyComments';
// import { MaybeVNodes } from '../../../interfaces';
// import { throttle } from 'common';

export function render(ctrl: GamebookPlayerCtrl): VNode {

  const root = ctrl.root,
  isMyMove = root.turnColor() === root.data.orientation,
  comment = (root.node.comments || [])[0];

  return h('div.gamebook', {
    hook: { insert: _ => window.lichess.loadCss('/assets/stylesheets/gamebook.player.css') }
  }, [
    h('div.player', [
      h('div.turn', isMyMove ? 'Your move' : 'Opponent move'),
      h('div.comment', {
        hook: comment && innerHTML(comment.text, text => enrichText(text, true))
      })
    ])
  ]);
}