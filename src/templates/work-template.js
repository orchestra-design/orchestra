import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { sliderCount } from '../actions'
import {
  Context,
  Footer,
  ImageSlider,
  WorkImageCaption,
  WorkStatement,
  WorkSecondScreen,
} from '../components/blocks'
import { ScrollChild } from '../components/elements'
import {
  concat,
  includes,
  isEmpty,
  mergeDeepWith,
  path,
  pick,
  not,
  safeMap,
  uuid,
} from '../helpers'
import TemplateWrapper from '../components/layouts'

const WorkTemplate = ({
  data: { work, allworks, seo, allSite, links, meta },
  location,
  sliderCounter,
}) => {
  const data = path(['data'], work)
  const tags = path(['tags'], work)
  const { body, color, context, image, statement, theme } = data
  const appendedLinks = mergeDeepWith(concat, links, {
    data: {
      headerlinks: [
        {
          linktitle: seo.lang.includes('ru') ? 'Проекты' : 'Works',
          link: {
            url: `/${seo.lang.replace('-us', '')}/projects`,
          },
        },
      ],
    },
  })

  return (
    <Fragment>
      <TemplateWrapper
        {...{ allSite }}
        {...{ color }}
        links={appendedLinks}
        {...{ image }}
        {...{ location }}
        {...{ meta }}
        {...{ seo }}
        title={statement.text}
      >
        <ScrollChild image={image} {...{ theme }}>
          <WorkStatement
            data={pick(
              [
                'client',
                'customtags',
                'descriptiontext',
                'location',
                'statement',
                'status',
                'timeline',
                'title',
                'type',
              ],
              data
            )}
          />
        </ScrollChild>
        <ScrollChild theme={'colored'}>
          <WorkSecondScreen
            data={pick(
              [
                'client',
                'customtags',
                'descriptiontext',
                'location',
                'statement',
                'status',
                'timeline',
                'title',
                'type',
              ],
              data
            )}
            lang={seo.lang}
            {...{ tags }}
          />
        </ScrollChild>
        {safeMap(section => {
          switch (section.__typename) {
            case 'PrismicWorkBodyImage':
              return (
                <ScrollChild
                  key={uuid()}
                  items={section.items}
                  theme={section.primary.imgtheme}
                  slider={includes('image', section.primary.imgtheme)}
                  sliderId={section.prismicId}
                >
                  <ImageSlider
                    key={uuid()}
                    items={section.items}
                    primary={section.primary}
                    sliderId={section.prismicId}
                  />
                </ScrollChild>
              )
            case 'PrismicWorkBodyImageCaption':
              return (
                <ScrollChild key={uuid()} theme={section.primary.sictheme}>
                  <WorkImageCaption
                    key={uuid()}
                    {...{ color }}
                    items={section.items}
                    primary={section.primary}
                  />
                </ScrollChild>
              )
            default:
              return <Fragment key={uuid()} />
          }
        })(body)}
        <ScrollChild theme={'black'}>
          {not(isEmpty(context)) && (
            <Context {...{ allworks }} {...{ context }} />
          )}
        </ScrollChild>
        <ScrollChild theme={'black'}>
          <Footer {...{ meta }} />
        </ScrollChild>
      </TemplateWrapper>
    </Fragment>
  )
}

export default compose(
  connect(
    pick(['sliderCounter']),
    { sliderCount }
  ),
  lifecycle({
    componentDidMount() {
      this.props.data.work.data.body.map(section =>
        this.props.sliderCount({ [section.prismicId]: 0 })
      )
    },
  })
)(WorkTemplate)

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!) {
    work: prismicWork(uid: { eq: $slug }, lang: { eq: $lang }) {
      tags
      data {
        title
        statement {
          text
        }
        image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1920, quality: 80) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        color
        theme
        descriptiontext {
          html
        }
        location
        type
        status
        timeline
        client
        customtags {
          tagtitle
          tagdescription
        }
        context {
          image {
            localFile {
              childImageSharp {
                sizes(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          hoverimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          link {
            url
            document {
              uid
            }
          }
        }
        body {
          __typename
          ... on PrismicWorkBodyImage {
            prismicId
            primary {
              imgtheme
              imgtext {
                html
              }
            }
            items {
              imgimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
          }
          ... on PrismicWorkBodyImageCaption {
            primary {
              sicgrid
              sictheme
              sicimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 720, quality: 80) {
                      ...GatsbyImageSharpSizes_noBase64
                    }
                  }
                }
              }
              siccaption
              sicheader {
                html
              }
            }
            items {
              sictext {
                html
              }
              sictextimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 480, quality: 80) {
                      ...GatsbyImageSharpSizes_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allworks: allPrismicWork(filter: { lang: { eq: $lang } }) {
      edges {
        node {
          uid
          data {
            title
            statement {
              text
            }
            color
          }
        }
      }
    }
    seo: prismicWork(uid: { eq: $slug }, lang: { eq: $lang }) {
      uid
      lang
      data {
        seotitle
        seodescription
        seokeywords
        seoimage {
          localFile {
            childImageSharp {
              resolutions(width: 1200, height: 630) {
                ...GatsbyImageSharpResolutions_noBase64
              }
            }
          }
        }
      }
    }
    links: prismicWorks(lang: { eq: $lang }) {
      data {
        headerlinks {
          linktitle
          link {
            url
          }
        }
      }
    }
    allSite: allSitePage {
      edges {
        node {
          path
        }
      }
    }
    meta: prismicMeta(lang: { eq: $lang }) {
      ...MetaFragment
    }
  }
`
