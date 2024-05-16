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
{
    avatar: 'https://avatars.githubusercontent.com/u/16284115?s=400&u=421bf4e971a70e62fd9426e265a12eefc4aed991&v=4',
    name: 'Ian Xu',
    title: 'DevRel & Developer',
    links: [
      { icon: 'github', link: 'https://github.com/panyongxu1002' },
      { icon: 'twitter', link: 'https://twitter.com/imxy007' }
    ]
  }
]
</script>

# 社区贡献者们

Say hello 👋 to our awesome contributors 🧑‍💻.

<VPTeamMembers size="small" :members="members" />
