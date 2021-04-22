
export interface CreateUserResponseDTO {
  
  id: number
  roleId: number
  email: string
  phone: string
  login_attempt: string
  created_at: Date
  fb_id: string
  fb_token: string
  fb_email: string

}