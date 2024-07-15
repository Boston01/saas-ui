

export type User = {
    first_name: string;
    last_name: string;
    email: string;
    projects: string[];
  };
  enum clusterSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    XLarge = 'xlarge',
    Custom = 'custom',
  }

  export type Service = {
    organisation: string;
    project_name: string;
    env_name: string;
    override_dns: string;
    cluster_size: clusterSize;
  }

  export type CustomSpecs = {
      zookeeper_count:  string;
			clickhouse_count:  string;
			postgres_count:  string;
			calculator_count:  string;
			rafal_count:  string;
			zookeeper_vm:  string;
			clickhouse_vm:  string;
			postgres_vm:  string;
			calculator_vm:  string;
			rafal_vm:  string;
			zookeeper_disk_size:  string;
			clickhouse_disk_size:  string;
			postgres_disk_size:  string;
			calculator_disk_size:  string;
			rafal_disk_size:  string;
  }