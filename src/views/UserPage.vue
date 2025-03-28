<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getUserInfo, updateUserInfo, changePassword } from '@/api/user'

const store = useStore()
const loading = ref(false)

// 用户信息表单
const userForm = ref({
  nickname: '',
  email: '',
  phone: '',
  avatar: ''
})

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 表单引用
const userFormRef = ref(null)
const passwordFormRef = ref(null)

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    loading.value = true
    const data = await getUserInfo()
    userForm.value = { ...data }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  } finally {
    loading.value = false
  }
}

// 更新用户信息
const handleUpdateUserInfo = async () => {
  if (!userFormRef.value) return
  
  try {
    await userFormRef.value.validate()
    loading.value = true
    
    await updateUserInfo(userForm.value)
    ElMessage.success('更新成功')
  } catch (error) {
    console.error('更新用户信息失败:', error)
  } finally {
    loading.value = false
  }
}

// 修改密码
const handleChangePassword = async () => {
  if (!passwordFormRef.value) return
  
  try {
    await passwordFormRef.value.validate()
    loading.value = true
    
    await changePassword(passwordForm.value)
    ElMessage.success('密码修改成功')
    
    // 清空表单
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('修改密码失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <div class="user-page">
    <div class="container">
      <el-row :gutter="20">
        <!-- 用户信息 -->
        <el-col :span="16">
          <el-card class="user-info-card">
            <template #header>
              <div class="card-header">
                <span>个人信息</span>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="handleUpdateUserInfo"
                >
                  保存修改
                </el-button>
              </div>
            </template>
            
            <el-form
              ref="userFormRef"
              :model="userForm"
              label-width="100px"
            >
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="(res) => userForm.avatar = res.url"
                >
                  <img
                    v-if="userForm.avatar"
                    :src="userForm.avatar"
                    class="avatar"
                  >
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
              
              <el-form-item label="昵称">
                <el-input v-model="userForm.nickname" />
              </el-form-item>
              
              <el-form-item label="邮箱">
                <el-input v-model="userForm.email" />
              </el-form-item>
              
              <el-form-item label="手机">
                <el-input v-model="userForm.phone" />
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        
        <!-- 修改密码 -->
        <el-col :span="8">
          <el-card class="password-card">
            <template #header>
              <div class="card-header">
                <span>修改密码</span>
              </div>
            </template>
            
            <el-form
              ref="passwordFormRef"
              :model="passwordForm"
              :rules="passwordRules"
              label-width="100px"
            >
              <el-form-item label="原密码" prop="oldPassword">
                <el-input
                  v-model="passwordForm.oldPassword"
                  type="password"
                  show-password
                />
              </el-form-item>
              
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  v-model="passwordForm.newPassword"
                  type="password"
                  show-password
                />
              </el-form-item>
              
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  show-password
                />
              </el-form-item>
              
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="handleChangePassword"
                >
                  修改密码
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.user-page {
  padding: var(--spacing-xl) 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed var(--light-gray);
  border-radius: 50%;
  cursor: pointer;
  transition: border-color var(--transition-speed) var(--transition-timing);
}

.avatar-uploader .avatar-uploader-icon:hover {
  border-color: var(--accent-color);
}
</style> 