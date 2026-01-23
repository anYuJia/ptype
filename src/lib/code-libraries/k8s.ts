import { CodeLibrary, cleanCode } from './types'

/**
 * Kubernetes (YAML) 代码库
 * 这里我们实际上是把 YAML 当作文本处理，
 * 只要 Highlighting 能够处理即可。或者之后加一个 'yaml' 语言类型。
 */
export const k8sLibrary: CodeLibrary = {
  easy: [
    {
      code: cleanCode(
        `apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx:1.14.2\n    ports:\n    - containerPort: 80`
      ),
      difficulty: 'easy',
      title: 'Pod 定义',
      tags: ['K8s', 'Pod'],
    },
    {
      code: cleanCode(
        `apiVersion: v1\nkind: Service\nmetadata:\n  name: my-service\nspec:\n  selector:\n    app: MyApp\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 9376`
      ),
      difficulty: 'easy',
      title: 'Service 定义',
      tags: ['K8s', 'Service'],
    },
  ],

  medium: [
    {
      code: cleanCode(
        `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\n  labels:\n    app: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80`
      ),
      difficulty: 'medium',
      title: 'Deployment',
      tags: ['K8s', 'Deployment'],
    },
    {
      code: cleanCode(
        `apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: game-demo\ndata:\n  player_initial_lives: "3"\n  ui_properties_file_name: "user-interface.properties"`
      ),
      difficulty: 'medium',
      title: 'ConfigMap',
      tags: ['K8s', 'Config'],
    },
  ],

  hard: [
    {
      code: cleanCode(
        `apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: minimal-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\nspec:\n  rules:\n  - http:\n      paths:\n      - path: /testpath\n        pathType: Prefix\n        backend:\n          service:\n            name: test\n            port:\n              number: 80`
      ),
      difficulty: 'hard',
      title: 'Ingress',
      tags: ['K8s', 'Network'],
    },
    {
      code: cleanCode(
        `apiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: fluentd-elasticsearch\n  namespace: kube-system\n  labels:\n    k8s-app: fluentd-logging\nspec:\n  selector:\n    matchLabels:\n      name: fluentd-elasticsearch\n  template:\n    metadata:\n      labels:\n        name: fluentd-elasticsearch\n    spec:\n      tolerations:\n      - key: node-role.kubernetes.io/master\n        effect: NoSchedule\n      containers:\n      - name: fluentd-elasticsearch\n        image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2\n        resources:\n          limits:\n            memory: 200Mi\n          requests:\n            cpu: 100m\n            memory: 200Mi`
      ),
      difficulty: 'hard',
      title: 'DaemonSet',
      tags: ['K8s', 'Workload'],
    },
  ],
}
