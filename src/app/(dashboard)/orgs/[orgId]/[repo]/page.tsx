import { RepoDashboard } from '@/components/component/repo-dashboard'
import React from 'react'

type Props = {}

const RepoPage = ({params}: {
  params: {
    orgId: string,
    repo: string
  }

}) => {

  return (
    <RepoDashboard
    orgName={params.orgId}
    repoName={params.repo}
    />
  )
}

export default RepoPage