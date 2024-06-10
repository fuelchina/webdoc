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
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/84056084?v=4',
    name: 'Finch Ren',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/BigBroFinch' },
      { icon: 'twitter', link: 'https://twitter.com/FinchR1992' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/58540575?s=400&u=fa72e490906630899bc4b074db0f9a7e88e65f23&v=4',
    name: 'Sun',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/jiahao6635' },
      { icon: 'twitter', link: 'https://x.com/shi_xiao0101' }
    ]
  },
]
</script>

# 社区贡献者们

Say hello 👋 to our awesome contributors 🧑‍💻.

<VPTeamMembers size="small" :members="members" />
