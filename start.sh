#!/bin/bash
# PType 一键启动脚本
# 支持 Docker 部署和本地部署两种模式

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 打印函数
print_header() {
  echo ""
  echo -e "${CYAN}=========================================${NC}"
  echo -e "${CYAN}  🚀 PType 一键启动脚本${NC}"
  echo -e "${CYAN}=========================================${NC}"
  echo ""
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

# 生成随机密钥
generate_secret() {
  if command -v openssl &> /dev/null; then
    openssl rand -base64 32
  else
    # 备用方案
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
  fi
}

# 检测是否需要 sudo
detect_sudo() {
  SUDO=""
  if command -v docker &> /dev/null; then
    if ! docker info > /dev/null 2>&1; then
      if sudo docker info > /dev/null 2>&1; then
        SUDO="sudo"
      fi
    fi
  fi
}

# 检查并创建 .env 文件
setup_env_file() {
  if [ -f ".env" ]; then
    print_success "检测到 .env 文件"
    
    # 检查是否使用默认值
    if grep -q "your-jwt-secret-key-change-this-in-production" .env 2>/dev/null || \
       grep -q "your-signature-secret-key-change-this-in-production" .env 2>/dev/null; then
      print_warning "检测到 .env 使用默认密钥，建议修改！"
      echo ""
      read -p "是否现在自动生成安全密钥？[Y/n]: " gen_keys
      if [[ ! "$gen_keys" =~ ^[Nn]$ ]]; then
        generate_env_secrets
      fi
    fi
    return 0
  fi

  print_warning ".env 文件不存在"
  echo ""
  echo "需要创建 .env 配置文件。请选择："
  echo ""
  echo "  1) 自动生成（推荐）- 自动生成安全密钥"
  echo "  2) 从模板复制 - 复制 .env.example 后手动编辑"
  echo "  3) 手动配置 - 逐项输入配置"
  echo ""
  read -p "请选择 [1/2/3]: " env_choice

  case $env_choice in
    1)
      create_env_auto
      ;;
    2)
      if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "已复制 .env.example 到 .env"
        print_warning "请编辑 .env 文件修改 JWT_SECRET 和 SIGNATURE_SECRET"
        echo ""
        read -p "按 Enter 继续，或输入 'e' 打开编辑: " edit_choice
        if [[ "$edit_choice" == "e" ]]; then
          ${EDITOR:-nano} .env
        fi
      else
        print_error ".env.example 不存在，将使用自动生成"
        create_env_auto
      fi
      ;;
    3)
      create_env_manual
      ;;
    *)
      create_env_auto
      ;;
  esac
}

# 自动创建 .env
create_env_auto() {
  print_info "正在自动生成 .env 文件..."
  
  JWT_SECRET=$(generate_secret)
  SIGNATURE_SECRET=$(generate_secret)
  
  cat > .env << EOF
# ===========================================
# PType 环境变量配置（自动生成）
# ===========================================

# 数据库连接（PostgreSQL）
DATABASE_URL="postgresql://ptype:ptype@localhost:5432/ptype?schema=public"

# JWT 密钥（用于用户认证）
JWT_SECRET="$JWT_SECRET"

# 签名密钥（用于请求签名验证）
SIGNATURE_SECRET="$SIGNATURE_SECRET"

# Cookie 安全设置
# - true: 仅 HTTPS（生产环境推荐）
# - false: 允许 HTTP（本地开发）
SECURE_COOKIES=false

# Node 环境
NODE_ENV=production
EOF

  print_success ".env 文件已自动生成！"
  print_info "JWT_SECRET 和 SIGNATURE_SECRET 已自动生成安全密钥"
}

# 手动创建 .env
create_env_manual() {
  echo ""
  print_info "手动配置环境变量"
  echo ""
  
  # 数据库配置
  echo "📦 数据库配置"
  read -p "PostgreSQL 主机 [localhost]: " db_host
  db_host=${db_host:-localhost}
  read -p "PostgreSQL 端口 [5432]: " db_port
  db_port=${db_port:-5432}
  read -p "数据库名 [ptype]: " db_name
  db_name=${db_name:-ptype}
  read -p "数据库用户 [ptype]: " db_user
  db_user=${db_user:-ptype}
  read -sp "数据库密码 [ptype]: " db_pass
  db_pass=${db_pass:-ptype}
  echo ""
  
  DATABASE_URL="postgresql://$db_user:$db_pass@$db_host:$db_port/$db_name?schema=public"
  
  # 密钥配置
  echo ""
  echo "🔐 安全密钥配置"
  read -p "JWT_SECRET（留空自动生成）: " jwt_secret
  if [ -z "$jwt_secret" ]; then
    jwt_secret=$(generate_secret)
    print_info "已自动生成 JWT_SECRET"
  fi
  
  read -p "SIGNATURE_SECRET（留空自动生成）: " sig_secret
  if [ -z "$sig_secret" ]; then
    sig_secret=$(generate_secret)
    print_info "已自动生成 SIGNATURE_SECRET"
  fi
  
  # Cookie 配置
  echo ""
  echo "🍪 Cookie 配置"
  read -p "是否使用 HTTPS？[y/N]: " use_https
  if [[ "$use_https" =~ ^[Yy]$ ]]; then
    secure_cookies="true"
  else
    secure_cookies="false"
  fi
  
  # 生成文件
  cat > .env << EOF
# ===========================================
# PType 环境变量配置
# ===========================================

DATABASE_URL="$DATABASE_URL"
JWT_SECRET="$jwt_secret"
SIGNATURE_SECRET="$sig_secret"
SECURE_COOKIES=$secure_cookies
NODE_ENV=production
EOF

  print_success ".env 文件已创建！"
}

# 更新 .env 中的密钥
generate_env_secrets() {
  JWT_SECRET=$(generate_secret)
  SIGNATURE_SECRET=$(generate_secret)
  
  # 使用 sed 替换
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=\"$JWT_SECRET\"/" .env
    sed -i '' "s/SIGNATURE_SECRET=.*/SIGNATURE_SECRET=\"$SIGNATURE_SECRET\"/" .env
  else
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=\"$JWT_SECRET\"/" .env
    sed -i "s/SIGNATURE_SECRET=.*/SIGNATURE_SECRET=\"$SIGNATURE_SECRET\"/" .env
  fi
  
  print_success "已自动生成新的安全密钥！"
}

# Docker 部署
deploy_docker() {
  echo ""
  print_info "Docker 部署模式"
  echo ""
  
  detect_sudo
  
  # 检查 Docker
  if ! command -v docker &> /dev/null; then
    print_error "未安装 Docker！"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
  fi
  
  if ! $SUDO docker info > /dev/null 2>&1; then
    print_error "Docker 未运行，请先启动 Docker"
    exit 1
  fi
  print_success "Docker 正在运行"
  
  # 检查 docker-compose
  if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="$SUDO docker-compose"
  elif $SUDO docker compose version &> /dev/null 2>&1; then
    COMPOSE_CMD="$SUDO docker compose"
  else
    print_error "未找到 docker-compose，请先安装"
    exit 1
  fi
  print_success "使用 $COMPOSE_CMD"
  
  # 更新 .env 中的 DATABASE_URL 为 Docker 网络地址
  # Docker 会在 docker-compose.yml 中覆盖这个值
  
  # 解析参数
  BUILD_FLAG=""
  DETACH_FLAG=""
  for arg in "$@"; do
    case $arg in
      --build|-b) BUILD_FLAG="--build" ;;
      --detach|-d) DETACH_FLAG="-d" ;;
    esac
  done
  
  echo ""
  echo "🐳 启动 Docker 容器..."
  echo ""
  $COMPOSE_CMD up $BUILD_FLAG $DETACH_FLAG
  
  if [ -n "$DETACH_FLAG" ]; then
    echo ""
    print_success "PType 已在后台启动!"
    echo ""
    echo -e "📍 访问地址: ${GREEN}http://localhost:3000${NC}"
    echo ""
    echo "常用命令:"
    echo "  查看日志: $COMPOSE_CMD logs -f"
    echo "  停止服务: $COMPOSE_CMD down"
    echo "  停止并删除数据: $COMPOSE_CMD down -v"
  fi
}

# 从 .env 文件读取变量
load_env() {
  if [ -f ".env" ]; then
    # 读取 .env 文件，忽略注释和空行
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
  fi
}

# 构建 DATABASE_URL
build_database_url() {
  local host=${1:-localhost}
  echo "postgresql://${DB_USER:-ptype}:${DB_PASSWORD:-ptype}@${host}:${DB_PORT:-5432}/${DB_NAME:-ptype}?schema=public"
}

# 检查 PostgreSQL 连接
check_postgres_connection() {
  local host=$1
  if command -v psql &> /dev/null; then
    PGPASSWORD="${DB_PASSWORD:-ptype}" psql -h "$host" -p "${DB_PORT:-5432}" -U "${DB_USER:-ptype}" -d "${DB_NAME:-ptype}" -c "SELECT 1" > /dev/null 2>&1
    return $?
  elif command -v pg_isready &> /dev/null; then
    pg_isready -h "$host" -p "${DB_PORT:-5432}" -U "${DB_USER:-ptype}" > /dev/null 2>&1
    return $?
  fi
  return 1
}

# 自动配置 PostgreSQL 数据库
setup_postgres_database() {
  echo ""
  print_info "自动配置 PostgreSQL 数据库..."
  echo ""
  
  # 从 .env 读取配置
  load_env
  
  local db_user="${DB_USER:-ptype}"
  local db_pass="${DB_PASSWORD:-ptype}"
  local db_name="${DB_NAME:-ptype}"
  local db_port="${DB_PORT:-5432}"
  
  echo "数据库配置（来自 .env）："
  echo "  用户: $db_user"
  echo "  数据库: $db_name"
  echo "  端口: $db_port"
  echo ""
  
  # 检查 psql 是否可用
  if ! command -v psql &> /dev/null; then
    print_warning "未找到 psql 命令，无法自动配置数据库"
    echo ""
    echo "请手动创建数据库，执行以下 SQL："
    echo ""
    echo "  CREATE USER $db_user WITH PASSWORD '$db_pass';"
    echo "  CREATE DATABASE $db_name OWNER $db_user;"
    echo "  GRANT ALL PRIVILEGES ON DATABASE $db_name TO $db_user;"
    echo ""
    read -p "按 Enter 继续..." 
    return 1
  fi
  
  echo "请选择 PostgreSQL 配置方式："
  echo ""
  echo "  1) 使用 Docker 启动 PostgreSQL（推荐）"
  echo "  2) 使用本地 PostgreSQL（需要 sudo/postgres 权限）"
  echo "  3) 跳过，我已手动配置好数据库"
  echo ""
  read -p "请选择 [1/2/3]: " pg_choice
  
  case $pg_choice in
    1)
      setup_postgres_docker
      ;;
    2)
      setup_postgres_local "$db_user" "$db_pass" "$db_name"
      ;;
    3)
      print_info "跳过数据库配置"
      ;;
    *)
      setup_postgres_docker
      ;;
  esac
}

# 使用 Docker 启动 PostgreSQL
setup_postgres_docker() {
  detect_sudo
  
  if ! command -v docker &> /dev/null; then
    print_error "未安装 Docker！"
    return 1
  fi
  
  print_info "使用 Docker 启动 PostgreSQL..."
  
  # 检查 docker-compose 是否可用
  if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="$SUDO docker-compose"
  elif $SUDO docker compose version &> /dev/null 2>&1; then
    COMPOSE_CMD="$SUDO docker compose"
  else
    print_error "未找到 docker-compose"
    return 1
  fi
  
  # 仅启动数据库服务
  $COMPOSE_CMD up -d db
  
  # 等待数据库就绪
  echo ""
  print_info "等待数据库就绪..."
  sleep 5
  
  # 检查数据库健康状态
  for i in {1..30}; do
    if $SUDO docker exec ptype_db pg_isready -U "${DB_USER:-ptype}" > /dev/null 2>&1; then
      print_success "PostgreSQL 已就绪！"
      return 0
    fi
    echo -n "."
    sleep 1
  done
  
  print_error "数据库启动超时"
  return 1
}

# 自动安装 PostgreSQL
install_postgresql() {
  echo ""
  print_info "正在安装 PostgreSQL..."
  echo ""
  
  # 检测操作系统并安装
  if [[ -f /etc/debian_version ]]; then
    # Debian/Ubuntu
    print_info "检测到 Debian/Ubuntu 系统"
    echo ""
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib postgresql-client
    
    # 启动并启用服务
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
  elif [[ -f /etc/redhat-release ]]; then
    # CentOS/RHEL/Fedora
    print_info "检测到 CentOS/RHEL/Fedora 系统"
    echo ""
    
    if command -v dnf &> /dev/null; then
      sudo dnf install -y postgresql-server postgresql-contrib
    else
      sudo yum install -y postgresql-server postgresql-contrib
    fi
    
    # 初始化数据库
    sudo postgresql-setup --initdb 2>/dev/null || sudo postgresql-setup initdb
    
    # 启动并启用服务
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    print_info "检测到 macOS 系统"
    echo ""
    
    if ! command -v brew &> /dev/null; then
      print_error "需要先安装 Homebrew: https://brew.sh"
      return 1
    fi
    
    brew install postgresql@16
    brew services start postgresql@16
    
    # 添加到 PATH
    echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
    export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
    
  elif [[ -f /etc/arch-release ]]; then
    # Arch Linux
    print_info "检测到 Arch Linux 系统"
    echo ""
    sudo pacman -Sy --noconfirm postgresql
    
    # 初始化数据库
    sudo -u postgres initdb -D /var/lib/postgres/data
    
    # 启动并启用服务
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
  else
    print_error "不支持的操作系统，请手动安装 PostgreSQL"
    echo "请参考: https://www.postgresql.org/download/"
    return 1
  fi
  
  # 等待服务启动
  sleep 3
  
  # 验证安装
  if command -v psql &> /dev/null || command -v pg_isready &> /dev/null; then
    print_success "PostgreSQL 安装成功！"
    
    # 检查服务是否运行
    if pg_isready -h localhost -p "${DB_PORT:-5432}" > /dev/null 2>&1; then
      print_success "PostgreSQL 服务已启动"
      return 0
    else
      print_warning "PostgreSQL 已安装但服务未运行，正在启动..."
      if command -v systemctl &> /dev/null; then
        sudo systemctl start postgresql
      elif command -v service &> /dev/null; then
        sudo service postgresql start
      fi
      sleep 2
      return 0
    fi
  else
    print_error "安装失败，请检查错误信息"
    return 1
  fi
}

# 使用本地 PostgreSQL
setup_postgres_local() {
  local db_user=$1
  local db_pass=$2
  local db_name=$3
  
  print_info "配置本地 PostgreSQL..."
  echo ""
  
  # 检查 PostgreSQL 是否已安装
  if ! command -v psql &> /dev/null && ! command -v pg_isready &> /dev/null; then
    print_warning "未检测到 PostgreSQL 安装"
    echo ""
    echo "请选择："
    echo "  1) 自动安装 PostgreSQL（推荐）"
    echo "  2) 改用 Docker 启动 PostgreSQL"
    echo "  3) 显示手动安装命令"
    echo ""
    read -p "请选择 [1/2/3]: " pg_install_choice
    
    case $pg_install_choice in
      1)
        install_postgresql
        if [ $? -ne 0 ]; then
          print_error "安装失败"
          return 1
        fi
        ;;
      2)
        setup_postgres_docker
        return $?
        ;;
      3)
        echo ""
        echo "请手动安装 PostgreSQL："
        echo ""
        if [[ -f /etc/debian_version ]]; then
          echo "  # Debian/Ubuntu:"
          echo "  sudo apt update && sudo apt install -y postgresql postgresql-contrib"
        elif [[ -f /etc/redhat-release ]]; then
          echo "  # CentOS/RHEL:"
          echo "  sudo yum install -y postgresql-server postgresql-contrib"
          echo "  sudo postgresql-setup --initdb"
        elif [[ "$OSTYPE" == "darwin"* ]]; then
          echo "  # macOS (使用 Homebrew):"
          echo "  brew install postgresql@16"
          echo "  brew services start postgresql@16"
        else
          echo "  请参考: https://www.postgresql.org/download/"
        fi
        echo ""
        read -p "安装完成后按 Enter 继续，或输入 'q' 返回: " install_done
        if [[ "$install_done" == "q" ]]; then
          return 1
        fi
        ;;
      *)
        return 1
        ;;
    esac
  fi
  
  # 检查 PostgreSQL 服务是否运行
  print_info "检查 PostgreSQL 服务状态..."
  
  PG_RUNNING=false
  
  # 尝试多种方式检测
  if pg_isready -h localhost -p "${DB_PORT:-5432}" > /dev/null 2>&1; then
    PG_RUNNING=true
  elif systemctl is-active --quiet postgresql 2>/dev/null; then
    PG_RUNNING=true
  elif service postgresql status > /dev/null 2>&1; then
    PG_RUNNING=true
  fi
  
  if [ "$PG_RUNNING" = false ]; then
    print_warning "PostgreSQL 服务未运行"
    echo ""
    echo "请选择："
    echo "  1) 尝试启动 PostgreSQL 服务"
    echo "  2) 改用 Docker 启动 PostgreSQL"
    echo "  3) 我来手动启动"
    echo ""
    read -p "请选择 [1/2/3]: " start_choice
    
    case $start_choice in
      1)
        echo ""
        print_info "尝试启动 PostgreSQL 服务..."
        
        # 尝试不同的启动方式
        if command -v systemctl &> /dev/null; then
          sudo systemctl start postgresql && sudo systemctl enable postgresql
        elif command -v service &> /dev/null; then
          sudo service postgresql start
        elif [[ "$OSTYPE" == "darwin"* ]]; then
          brew services start postgresql@16 2>/dev/null || brew services start postgresql
        else
          print_error "无法自动启动，请手动启动 PostgreSQL 服务"
          return 1
        fi
        
        # 等待服务启动
        sleep 3
        
        if pg_isready -h localhost -p "${DB_PORT:-5432}" > /dev/null 2>&1; then
          print_success "PostgreSQL 服务已启动"
        else
          print_error "启动失败，请检查 PostgreSQL 安装"
          return 1
        fi
        ;;
      2)
        setup_postgres_docker
        return $?
        ;;
      3)
        echo ""
        echo "请启动 PostgreSQL 服务后按 Enter 继续..."
        read
        if ! pg_isready -h localhost -p "${DB_PORT:-5432}" > /dev/null 2>&1; then
          print_error "仍无法连接 PostgreSQL"
          return 1
        fi
        ;;
      *)
        return 1
        ;;
    esac
  else
    print_success "PostgreSQL 服务正在运行"
  fi
  
  # 检查是否可以连接到目标数据库
  if check_postgres_connection "localhost"; then
    print_success "数据库 $db_name 已存在且可连接"
    return 0
  fi
  
  echo ""
  print_info "创建数据库和用户..."
  
  # 尝试用 sudo -u postgres 创建
  if sudo -u postgres psql -c "SELECT 1" > /dev/null 2>&1; then
    print_info "使用 postgres 用户创建数据库..."
    
    # 先修复 collation 版本问题（如果存在）
    sudo -u postgres psql -c "ALTER DATABASE postgres REFRESH COLLATION VERSION;" 2>/dev/null || true
    sudo -u postgres psql -c "ALTER DATABASE template1 REFRESH COLLATION VERSION;" 2>/dev/null || true
    
    # 创建用户（如果不存在）
    sudo -u postgres psql -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '$db_user') THEN CREATE USER $db_user WITH PASSWORD '$db_pass'; END IF; END \$\$;" 2>/dev/null
    
    # 创建数据库（如果不存在）- 使用 template0 避免 collation 问题
    if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname = '$db_name'" 2>/dev/null | grep -q 1; then
      # 尝试使用 template0 创建（避免 collation 问题）
      if ! sudo -u postgres psql -c "CREATE DATABASE $db_name OWNER $db_user TEMPLATE template0 ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C';" 2>/dev/null; then
        # 如果失败，尝试普通方式
        sudo -u postgres psql -c "CREATE DATABASE $db_name OWNER $db_user;" 2>/dev/null || {
          print_error "创建数据库失败，可能存在 collation 版本问题"
          echo ""
          echo "请手动执行以下命令修复："
          echo "  sudo -u postgres psql"
          echo "  ALTER DATABASE template1 REFRESH COLLATION VERSION;"
          echo "  CREATE DATABASE $db_name OWNER $db_user;"
          echo "  \\q"
          echo ""
          read -p "修复后按 Enter 继续..."
        }
      fi
    fi
    
    # 授权
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $db_name TO $db_user;" 2>/dev/null
    
    # 验证连接
    if check_postgres_connection "localhost"; then
      print_success "数据库配置完成！"
      return 0
    else
      print_error "数据库创建成功但无法连接，请检查 pg_hba.conf 配置"
      echo ""
      echo "可能需要修改 pg_hba.conf 允许密码认证："
      echo "  1. 找到配置文件: sudo -u postgres psql -c 'SHOW hba_file;'"
      echo "  2. 添加一行: host all all 127.0.0.1/32 md5"
      echo "  3. 重启: sudo systemctl restart postgresql"
      echo ""
      read -p "修改后按 Enter 继续..."
      
      if check_postgres_connection "localhost"; then
        print_success "数据库连接成功！"
        return 0
      fi
    fi
  else
    print_warning "无法自动配置，请手动创建数据库"
    echo ""
    echo "以 postgres 用户执行以下命令："
    echo ""
    echo "  sudo -u postgres psql"
    echo "  CREATE USER $db_user WITH PASSWORD '$db_pass';"
    echo "  CREATE DATABASE $db_name OWNER $db_user;"
    echo "  GRANT ALL PRIVILEGES ON DATABASE $db_name TO $db_user;"
    echo "  \\q"
    echo ""
    echo "然后可能需要编辑 pg_hba.conf 添加密码认证："
    echo "  # 找到配置文件位置"
    echo "  sudo -u postgres psql -c 'SHOW hba_file;'"
    echo "  # 添加一行: host all all 127.0.0.1/32 md5"
    echo "  # 重启: sudo systemctl restart postgresql"
    echo ""
    read -p "完成后按 Enter 继续..."
    
    # 再次验证
    if check_postgres_connection "localhost"; then
      print_success "数据库连接成功！"
      return 0
    else
      print_error "仍无法连接数据库"
      return 1
    fi
  fi
}

# 本地部署
deploy_local() {
  echo ""
  print_info "本地开发/部署模式"
  echo ""
  
  # 加载 .env 配置
  load_env
  
  # 检查 Node.js
  if ! command -v node &> /dev/null; then
    print_error "未安装 Node.js！"
    echo "请先安装 Node.js >= 18: https://nodejs.org/"
    exit 1
  fi
  
  NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js 版本过低！当前: $(node -v)，需要: >= 18"
    exit 1
  fi
  print_success "Node.js $(node -v)"
  
  # 检查 npm
  if ! command -v npm &> /dev/null; then
    print_error "未安装 npm！"
    exit 1
  fi
  print_success "npm $(npm -v)"
  
  # 数据库配置
  echo ""
  echo "📦 数据库配置"
  echo ""
  
  # 确定数据库主机
  DB_HOST="localhost"
  
  # 检查是否已有数据库连接
  if check_postgres_connection "$DB_HOST"; then
    print_success "数据库连接正常"
  else
    print_warning "无法连接数据库"
    echo ""
    echo "请选择："
    echo "  1) 自动配置数据库"
    echo "  2) 我已手动配置，继续"
    echo ""
    read -p "请选择 [1/2]: " db_choice
    
    if [[ "$db_choice" != "2" ]]; then
      setup_postgres_database
    fi
  fi
  
  # 构建并设置 DATABASE_URL
  export DATABASE_URL=$(build_database_url "$DB_HOST")
  print_info "DATABASE_URL: $DATABASE_URL"
  
  # 检查依赖
  echo ""
  if [ ! -d "node_modules" ]; then
    print_warning "未找到 node_modules，正在安装依赖..."
    npm install
  else
    print_success "依赖已安装"
  fi
  
  # Prisma 设置
  echo ""
  print_info "配置 Prisma..."
  
  # 设置国内镜像
  export PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma"
  
  # 生成 Prisma 客户端
  npx prisma generate
  print_success "Prisma 客户端已生成"
  
  # 同步数据库
  echo ""
  read -p "是否同步数据库结构？[Y/n]: " sync_db
  if [[ ! "$sync_db" =~ ^[Nn]$ ]]; then
    npx prisma db push
    print_success "数据库结构已同步"
  fi
  
  # 选择启动模式
  echo ""
  echo "请选择启动模式："
  echo "  1) 开发模式 (npm run dev) - 热重载"
  echo "  2) 生产模式 (npm run build && npm start)"
  echo ""
  read -p "请选择 [1/2]: " run_mode
  
  case $run_mode in
    2)
      echo ""
      print_info "构建生产版本..."
      npm run build
      echo ""
      print_success "构建完成！启动服务..."
      npm start
      ;;
    *)
      echo ""
      print_info "启动开发服务器..."
      npm run dev
      ;;
  esac
}

# 显示帮助
show_help() {
  echo "用法: ./start.sh [命令] [选项]"
  echo ""
  echo "命令:"
  echo "  docker    使用 Docker 部署（默认）"
  echo "  local     本地开发/部署"
  echo "  setup     仅配置 .env 文件"
  echo "  help      显示帮助信息"
  echo ""
  echo "Docker 选项:"
  echo "  -b, --build   重新构建镜像"
  echo "  -d, --detach  后台运行"
  echo ""
  echo "示例:"
  echo "  ./start.sh                # 交互式选择"
  echo "  ./start.sh docker -d      # Docker 后台启动"
  echo "  ./start.sh docker -b -d   # Docker 重新构建并后台启动"
  echo "  ./start.sh local          # 本地开发模式"
  echo "  ./start.sh setup          # 仅配置环境变量"
}

# 主函数
main() {
  print_header
  
  # 解析命令
  COMMAND=$1
  shift 2>/dev/null || true
  
  case $COMMAND in
    docker)
      setup_env_file
      deploy_docker "$@"
      ;;
    local)
      setup_env_file
      deploy_local "$@"
      ;;
    setup)
      setup_env_file
      print_success "配置完成！"
      ;;
    help|--help|-h)
      show_help
      ;;
    *)
      # 交互式选择
      echo "请选择部署方式："
      echo ""
      echo "  1) 🐳 Docker 部署（推荐）"
      echo "     - 自动配置数据库和应用"
      echo "     - 一键启动完整环境"
      echo ""
      echo "  2) � 本地开发/部署"
      echo "     - 需要本地 Node.js 和 PostgreSQL"
      echo "     - 适合开发调试"
      echo ""
      read -p "请选择 [1/2]: " deploy_choice
      
      setup_env_file
      
      case $deploy_choice in
        2)
          deploy_local
          ;;
        *)
          # 询问 Docker 选项
          echo ""
          read -p "是否后台运行？[Y/n]: " bg_run
          DOCKER_ARGS=""
          if [[ ! "$bg_run" =~ ^[Nn]$ ]]; then
            DOCKER_ARGS="-d"
          fi
          
          read -p "是否重新构建镜像？[y/N]: " rebuild
          if [[ "$rebuild" =~ ^[Yy]$ ]]; then
            DOCKER_ARGS="$DOCKER_ARGS --build"
          fi
          
          deploy_docker $DOCKER_ARGS
          ;;
      esac
      ;;
  esac
}

main "$@"
