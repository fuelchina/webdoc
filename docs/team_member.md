<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/130636283?s=400&u=53d609287147e43e4f3cff48d30fc9dec1dc3286&v=4',
    name: 'MaxWell Pan',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/panyongxu1002' },
      { icon: 'twitter', link: 'https://twitter.com/YongxuPan' }
    ]
  },
]
</script>

# 我们的团队

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
