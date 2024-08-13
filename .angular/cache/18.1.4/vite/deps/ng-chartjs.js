import {
  auto_default
} from "./chunk-CXCTBF45.js";
import {
  Chart
} from "./chunk-HLFHGC6Z.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject
} from "./chunk-SGNZRHJF.js";
import "./chunk-KBUIKKCC.js";

// node_modules/ng-chartjs/fesm2020/ng-chartjs.mjs
var StoreService = class {
  constructor() {
    this._chartInstances = [];
    this._chartId = [];
  }
  addChart(id, chart) {
    for (let i = 0; i < this._chartId.length; i++) {
      if (id === this._chartId[i]) {
        return;
      }
    }
    this._chartId.push(id);
    this._chartInstances.push(chart);
  }
  removeChart(id) {
    for (let i = 0; i < this._chartId.length; i++) {
      if (id === this._chartId[i]) {
        this._chartId.splice(i, 1);
        this._chartInstances.splice(i, 1);
      }
    }
  }
  getChart(id) {
    for (let i = 0; i < this._chartId.length; i++) {
      if (id === this._chartId[i]) {
        return this._chartInstances[i];
      }
    }
    return null;
  }
};
StoreService.ɵfac = function StoreService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StoreService)();
};
StoreService.ɵprov = ɵɵdefineInjectable({
  token: StoreService,
  factory: StoreService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StoreService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NgChartjsCustomPluginConfig = class {
  constructor() {
    this.plugins = [];
  }
};
NgChartjsCustomPluginConfig.ɵfac = function NgChartjsCustomPluginConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgChartjsCustomPluginConfig)();
};
NgChartjsCustomPluginConfig.ɵprov = ɵɵdefineInjectable({
  token: NgChartjsCustomPluginConfig,
  factory: NgChartjsCustomPluginConfig.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartjsCustomPluginConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NgChartjsService = class {
  constructor(storeService, pluginConfig) {
    this.storeService = storeService;
    this.pluginConfig = pluginConfig;
    if (pluginConfig.plugins.length !== 0) {
      Chart.register(...pluginConfig.plugins);
    }
  }
  // get chart instance by id
  getChart(id) {
    return this.storeService.getChart(id);
  }
};
NgChartjsService.ɵfac = function NgChartjsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgChartjsService)(ɵɵinject(StoreService), ɵɵinject(NgChartjsCustomPluginConfig));
};
NgChartjsService.ɵprov = ɵɵdefineInjectable({
  token: NgChartjsService,
  factory: NgChartjsService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartjsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: StoreService
    }, {
      type: NgChartjsCustomPluginConfig
    }];
  }, null);
})();
function deepCopyJson(source) {
  if (!source || typeof source !== "object") {
    return source;
  }
  const newObj = source.constructor === Array ? [] : {};
  for (const key in source) {
    if (typeof source[key] === "object") {
      newObj[key] = deepCopyJson(source[key]);
    } else {
      newObj[key] = source[key];
    }
  }
  return newObj;
}
function mergeJson(source, dest) {
  if (!dest) {
    return source;
  }
  source = source || {};
  for (const key of Object.keys(dest)) {
    if (source[key] === void 0) {
      source[key] = deepCopyJson(dest[key]);
      continue;
    }
    if (isJson(dest[key])) {
      mergeJson(source[key], dest[key]);
    }
  }
  return source;
}
function isJson(target) {
  if (target === null || target === void 0) {
    return false;
  }
  return typeof target === "object" && target.constructor === Object;
}
var DefaultColors = [
  [63, 81, 181],
  [0, 150, 136],
  [255, 152, 0],
  [233, 30, 99],
  [156, 39, 176],
  [0, 188, 212],
  [3, 169, 244],
  [96, 125, 139],
  [255, 193, 7],
  [37, 155, 36],
  [205, 220, 57],
  [86, 119, 252]
  // Blue
];
function rgba(colour, alpha) {
  return "rgba(" + colour.concat(alpha).join(",") + ")";
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatLineColor(colors) {
  return {
    backgroundColor: rgba(colors, 0.35),
    borderColor: rgba(colors, 1),
    pointBackgroundColor: rgba(colors, 1),
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: rgba(colors, 0.95)
  };
}
function formatBarColor(colors) {
  return {
    backgroundColor: rgba(colors, 0.75),
    borderColor: rgba(colors, 1),
    hoverBackgroundColor: rgba(colors, 1),
    hoverBorderColor: rgba(colors, 1)
  };
}
function formatPieColors(colors) {
  return {
    backgroundColor: colors.map((color) => rgba(color, 0.76)),
    borderColor: colors.map(() => "#fff"),
    pointBackgroundColor: colors.map((color) => rgba(color, 1)),
    pointBorderColor: colors.map(() => "#fff"),
    pointHoverBackgroundColor: colors.map((color) => rgba(color, 1)),
    pointHoverBorderColor: colors.map((color) => rgba(color, 1))
  };
}
function formatPolarAreaColors(colors) {
  return {
    backgroundColor: colors.map((color) => rgba(color, 0.75)),
    borderColor: colors.map((color) => rgba(color, 1)),
    hoverBackgroundColor: colors.map((color) => rgba(color, 1)),
    hoverBorderColor: colors.map((color) => rgba(color, 1))
  };
}
function getRandomColor() {
  return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
function generateColor(index) {
  return DefaultColors[index] || getRandomColor();
}
function generateColors(count) {
  const colorsArr = new Array(count);
  for (let i = 0; i < count; i++) {
    colorsArr[i] = DefaultColors[i] || getRandomColor();
  }
  return colorsArr;
}
function getColors(chartType, index, count) {
  if (chartType === "pie" || chartType === "doughnut" || chartType === "bubble" || chartType === "scatter") {
    return formatPieColors(generateColors(count));
  }
  if (chartType === "polarArea") {
    return formatPolarAreaColors(generateColors(count));
  }
  if (chartType === "line" || chartType === "radar") {
    return formatLineColor(generateColor(index));
  }
  if (chartType === "bar" || chartType === "horizontalBar") {
    return formatBarColor(generateColor(index));
  }
  return generateColor(index);
}
var NgChartjsDirective = class {
  constructor(element, ngChartjsService, storeService, zone) {
    this.ngChartjsService = ngChartjsService;
    this.storeService = storeService;
    this.zone = zone;
    this.labels = [];
    this.noZone = true;
    this.id = null;
    this.chartClick = new EventEmitter();
    this.chartHover = new EventEmitter();
    this.initFlag = false;
    this.hasChanges = false;
    this.element = element;
  }
  ngOnInit() {
    this.ctx = this.element.nativeElement.getContext("2d");
    this.initFlag = true;
    if (this.data || this.datasets) {
      if (this.noZone) {
        this.zone.runOutsideAngular(() => {
          this.refresh();
        });
      } else {
        this.refresh();
      }
    }
  }
  ngOnChanges(changes) {
    if (this.initFlag) {
      if (changes.hasOwnProperty("data") || changes.hasOwnProperty("datasets")) {
        if (changes.data) {
          this.updateChartData(changes.data.currentValue);
        } else {
          this.updateChartData(changes.datasets.currentValue);
        }
        this.hasChanges = true;
      }
      if (changes.hasOwnProperty("labels")) {
        this.chart.data.labels = changes.labels.currentValue;
        this.hasChanges = true;
      }
      if (changes.hasOwnProperty("legend")) {
        if (changes.legend.currentValue !== changes.legend.previousValue) {
          this.chart.options.plugins.legend.display = changes.legend.currentValue;
          this.hasChanges = true;
        }
      }
      if (changes.hasOwnProperty("adding")) {
        this.addData_(changes.adding.currentValue.labels, changes.adding.currentValue.data);
        this.hasChanges = true;
      }
      if (changes.hasOwnProperty("removing")) {
        if (changes.removing.currentValue.orientation === "oldest" || changes.removing.currentValue.orientation === "latest") {
          this.removeData_(changes.removing.currentValue.orientation);
          this.hasChanges = true;
        }
      }
      if (changes.hasOwnProperty("chartType")) {
        this.refresh();
      }
      if (changes.hasOwnProperty("resetOption")) {
        const resetOption = deepCopyJson(changes.resetOption.currentValue);
        this.chart.options = mergeJson(resetOption, this.chart.options);
        this.hasChanges = true;
      }
      if (this.hasChanges) {
        this.chart.update();
        this.hasChanges = false;
      }
      if (changes.hasOwnProperty("id")) {
        this.removeChart(changes.id.previousValue);
        this.addChart(changes.id.currentValue);
      }
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
      this.removeChart(this.id);
    }
  }
  // update chartjs
  update() {
    this.chart.update();
  }
  // Dynamic add data
  addData(labels, data) {
    this.addData_(labels, data);
    this.update();
  }
  // Dynamic remove data, orientation is 'ildest' or 'latest'
  removeData(orientation) {
    this.removeData_(orientation);
    this.update();
  }
  refresh() {
    this.ngOnDestroy();
    this.chart = this.getChartBuilder(
      this.ctx
      /*, data, this.options*/
    );
    this.addChart(this.id);
  }
  removeChart(id) {
    if (this.element.nativeElement.hasAttribute("id")) {
      this.storeService.removeChart(this.element.nativeElement.id);
      return;
    }
    if (id !== null && id !== void 0) {
      this.storeService.removeChart(id);
    }
  }
  addChart(id) {
    if (this.element.nativeElement.hasAttribute("id")) {
      this.storeService.addChart(this.element.nativeElement.id, this.chart);
      return;
    }
    if (id !== null && id !== void 0) {
      this.storeService.addChart(id, this.chart);
    }
  }
  updateChartData(newDataValues) {
    if (Array.isArray(newDataValues[0].data)) {
      this.chart.data.datasets = newDataValues;
    } else {
      this.chart.data.datasets[0].data = newDataValues;
    }
    this.chart.data.datasets = this.updateColors(this.chart.data.datasets);
  }
  getChartBuilder(ctx) {
    const datasets = this.getDatasets();
    let options = this.options || {};
    options = Object.assign({}, this.options);
    mergeJson(options, {
      plugins: {
        legend: {
          display: this.legend
        }
      }
    });
    options.hover = options.hover || {};
    if (!options.onHover) {
      options.onHover = (event, active) => {
        if (active && !active.length) {
          return;
        }
        this.chartHover.emit({
          event,
          active
        });
      };
    }
    if (!options.onClick) {
      options.onClick = (event, active) => {
        this.chartClick.emit({
          event,
          active
        });
      };
    }
    const inlinePlugins = this.inlinePlugins || [];
    const opts = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets
        // TODO: 后续更改这个属性名字，否则警告
      },
      options,
      plugins: inlinePlugins
    };
    return new auto_default(ctx, opts);
  }
  // 获取 chart.js的datasets数据
  getDatasets() {
    let datasets = void 0;
    if (!this.datasets || !this.datasets.length && this.data && this.data.length) {
      if (Array.isArray(this.data[0])) {
        datasets = this.data.map((data, index) => {
          return {
            data,
            label: this.labels[index] || `Label ${index}`
          };
        });
      } else {
        datasets = [{
          data: this.data,
          label: `Label 0`
        }];
      }
    }
    datasets = this.updateColors(datasets);
    if (!datasets) {
      throw new Error(`ng-chartjs configuration error,
      data or datasets field are required to render char ${this.chartType}`);
    }
    return datasets;
  }
  // update dataset colors
  updateColors(datasets) {
    if (this.datasets && this.datasets.length || datasets && datasets.length) {
      datasets = (this.datasets || datasets).map((elm, index) => {
        const newElm = Object.assign({}, elm);
        if (this.colors && this.colors.length) {
          Object.assign(newElm, this.colors[index]);
        } else {
          Object.assign(newElm, getColors(this.chartType, index, newElm.data.length));
        }
        return newElm;
      });
    }
    return datasets;
  }
  addData_(labels, data) {
    if (labels.length === 0 || data.length === 0) {
      return;
    }
    labels.forEach((label) => {
      this.chart.data.labels.push(label);
    });
    this.chart.data.datasets.forEach((dataset, index) => {
      if (data[index]) {
        for (let i = 0; i < data[index].length; i++) {
          dataset.data.push(data[index][i]);
        }
      } else {
        console.log("The added data does not match the original data");
        return;
      }
    });
  }
  removeData_(orientation) {
    if (orientation === "latest") {
      this.chart.data.labels.pop();
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
    } else if (orientation === "oldest") {
      this.chart.data.labels.shift();
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
    }
  }
};
NgChartjsDirective.ɵfac = function NgChartjsDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgChartjsDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgChartjsService), ɵɵdirectiveInject(StoreService), ɵɵdirectiveInject(NgZone));
};
NgChartjsDirective.ɵdir = ɵɵdefineDirective({
  type: NgChartjsDirective,
  selectors: [["canvas", "ngChartjs", ""]],
  inputs: {
    data: "data",
    datasets: "datasets",
    labels: "labels",
    options: "options",
    inlinePlugins: "inlinePlugins",
    chartType: "chartType",
    colors: "colors",
    legend: "legend",
    adding: "adding",
    removing: "removing",
    resetOption: "resetOption",
    noZone: "noZone",
    id: "id"
  },
  outputs: {
    chartClick: "chartClick",
    chartHover: "chartHover"
  },
  exportAs: ["ngChartjs"],
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartjsDirective, [{
    type: Directive,
    args: [{
      selector: "canvas[ngChartjs]",
      exportAs: "ngChartjs"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgChartjsService
    }, {
      type: StoreService
    }, {
      type: NgZone
    }];
  }, {
    data: [{
      type: Input
    }],
    datasets: [{
      type: Input
    }],
    labels: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    inlinePlugins: [{
      type: Input
    }],
    chartType: [{
      type: Input
    }],
    colors: [{
      type: Input
    }],
    legend: [{
      type: Input
    }],
    adding: [{
      type: Input
    }],
    removing: [{
      type: Input
    }],
    resetOption: [{
      type: Input
    }],
    noZone: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    chartClick: [{
      type: Output
    }],
    chartHover: [{
      type: Output
    }]
  });
})();
var NgChartjsModule = class _NgChartjsModule {
  /**
   * Register a plugin.
   * @param plugins
   */
  static registerPlugin(plugins = []) {
    const config = new NgChartjsCustomPluginConfig();
    config.plugins = plugins;
    return {
      ngModule: _NgChartjsModule,
      providers: [{
        provide: NgChartjsCustomPluginConfig,
        useValue: config
      }]
    };
  }
};
NgChartjsModule.ɵfac = function NgChartjsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgChartjsModule)();
};
NgChartjsModule.ɵmod = ɵɵdefineNgModule({
  type: NgChartjsModule,
  declarations: [NgChartjsDirective],
  exports: [NgChartjsDirective]
});
NgChartjsModule.ɵinj = ɵɵdefineInjector({
  providers: [NgChartjsService]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartjsModule, [{
    type: NgModule,
    args: [{
      imports: [],
      declarations: [NgChartjsDirective],
      exports: [NgChartjsDirective],
      providers: [NgChartjsService]
    }]
  }], null, null);
})();
export {
  DefaultColors,
  NgChartjsDirective,
  NgChartjsModule,
  NgChartjsService,
  deepCopyJson,
  formatBarColor,
  formatLineColor,
  formatPieColors,
  formatPolarAreaColors,
  generateColor,
  generateColors,
  getColors,
  getRandomColor,
  getRandomInt,
  isJson,
  mergeJson,
  rgba
};
//# sourceMappingURL=ng-chartjs.js.map
