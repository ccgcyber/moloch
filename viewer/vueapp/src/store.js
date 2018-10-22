import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    timeRange: 1,
    expression: undefined,
    time: {
      startTime: undefined,
      stopTime: undefined
    },
    showMaps: true,
    mapSrc: true,
    mapDst: true,
    graphType: undefined,
    seriesType: undefined,
    focusSearch: undefined,
    issueSearch: undefined,
    focusTimeRange: undefined,
    shiftKeyHold: false,
    displayKeyboardShortcutsHelp: undefined,
    user: undefined,
    responseTime: undefined,
    sessionsTableState: undefined
  },
  mutations: {
    setTimeRange (state, value) {
      state.timeRange = value.toString();
    },
    setTime (state, value) {
      if (value.startTime) {
        state.time.startTime = value.startTime.toString();
      }
      if (value.stopTime) {
        state.time.stopTime = value.stopTime.toString();
      }
    },
    setExpression (state, value) {
      this.state.expression = value;
    },
    addToExpression (state, value) {
      let newExpr = '';

      if (!this.state.expression) { this.state.expression = ''; }

      if (this.state.expression && this.state.expression !== '') {
        if (this.state.expression[this.state.expression.length - 1] !== ' ') {
          // if last char is not a space, add it
          newExpr += ' ';
        }
        newExpr += (value.op || '&&') + ' ';
      }

      newExpr += value.expression;

      this.state.expression += newExpr;
    },
    clearExpression (state) {
      this.state.expression = undefined;
    },
    toggleMaps (state, value) {
      this.state.showMaps = value;
    },
    toggleMapSrc (state, value) {
      this.state.mapSrc = value;
    },
    toggleMapDst (state, value) {
      this.state.mapDst = value;
    },
    updateGraphType (state, value) {
      this.state.graphType = value;
    },
    updateSeriesType (state, value) {
      this.state.seriesType = value;
    },
    setFocusSearch (state, value) {
      this.state.focusSearch = value;
    },
    setIssueSearch (state, value) {
      this.state.issueSearch = value;
      if (value) {
        setTimeout(() => {
          this.state.issueSearch = false;
        });
      }
    },
    setFocusTimeRange (state, value) {
      this.state.focusTimeRange = value;
    },
    setShiftKeyHold (state, value) {
      this.state.shiftKeyHold = value;
    },
    setDisplayKeyboardShortcutsHelp (state, value) {
      this.state.displayKeyboardShortcutsHelp = value;
    },
    setUser (state, value) {
      this.state.user = value;
    },
    setUserSettings (state, value) {
      this.state.user.settings = value;
    },
    setResponseTime (state, value) {
      this.state.responseTime = value;
    },
    setSessionsTableState (state, value) {
      this.state.sessionsTableState = value;
    }
  }
});

export default store;
